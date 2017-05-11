class Api::V1::AuditionsController < ApplicationController


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
    video_id = audition.video_id

    url = URI("https://api.addpipe.com/video/#{video_id}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    request = Net::HTTP::Delete.new(url)
    request["x-pipe-auth"] = ENV["PIPE_API_KEY"]
    binding.pry
    request["content-type"] = 'application/json'
    request["cache-control"] = 'no-cache'


    response = http.request(request)
    puts response.read_body

    # audition.destroy
    binding.pry
    render json: gig_request
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
