class Api::V1::AuditionsController < ApplicationController

before_action :require_login
  def create
    user = current_user
    gig_req_id = params[:gig_request_id].to_i
    gig_request = GigRequest.find(gig_req_id)
    gig_req_audition = Audition.new
    gig_req_audition.gig_request = gig_request
    gig_req_audition.user = user
    gig_req_audition.name = params[:name]
    gig_req_audition.video_id = params[:video_id]
    if gig_req_audition.save
      AuditionMailer.new_audition(gig_req_audition).deliver_later
      render json: gig_req_audition
    end

  end

  def destroy

    require 'uri'
    require 'net/http'

    audition = Audition.find(params[:id])
    gig_request = GigRequest.find(params[:gig_request_id])
    if current_user == gig_request.user
        video_id = audition.video_id

        url = URI("https://api.addpipe.com/video/#{video_id}")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        request = Net::HTTP::Delete.new(url)
        request["x-pipe-auth"] = ENV['PIPE_API_KEY']
        request["content-type"] = 'application/json'
        request["cache-control"] = 'no-cache'

        response = http.request(request)
        puts response.read_body

        audition.destroy

        audition_data = gig_request.auditions.pluck(:id, :name)
        gig_auditions = audition_data.map do |audition|
          this_audition = Audition.find(audition[0])
          audition_user = this_audition.user
          audition << audition_user
        end
        flash[:alert] = "Audition Deleted"
        render json: gig_auditions
      end
    else
      flash.now[:alert] = 'Unauthorized User. Could not delete record.'
      audition_data = gig_request.auditions.pluck(:id, :name)
      gig_auditions = audition_data.map do |audition|
        this_audition = Audition.find(audition[0])
        audition_user = this_audition.user
        audition << audition_user
      end
      render json: gig_auditions
    end

  private
  def gig_req_audition_params
    params.permit(
    :gig_request_id,
    :name,
    :video_id,
    :id
    )

  end
end
