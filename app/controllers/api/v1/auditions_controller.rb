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
    if gig_req_audition.save
      render json: gig_req_audition
    end

  end

  private
  def gig_req_audition_params
    params.permit(
    :gig_request_id,
    :name
    )

  end
end
