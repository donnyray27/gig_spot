class Api::V1::AuditionsController < ApplicationController

  skip_before_action  :verify_authenticity_token

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
      render json: gig_req_audition
    end

  end
#DELETE https://api.addpipe.com/video/167841
  def destroy
    binding.pry
    require 'uri'
    require 'net/http'

    audition = Audition.find(params[:id])
    gig_request = GigRequest.find(params[:gig_request_id])
    video_id = audition.video_id

    url = URI("https://api.addpipe.com/video/#{video_id}")

    http = Net::HTTP.new(url.host, url.port)

    request = Net::HTTP::Delete.new(url)
    request["x-pipe-auth"] = 'Your-Pipe-Api-Key'
    request["content-type"] = 'application/json'
    request["cache-control"] = 'no-cache'


    response = http.request(request)
    puts response.read_body
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
