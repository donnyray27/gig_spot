class Api::V1::GigsController < ApplicationController

  skip_before_filter  :verify_authenticity_token

  def index
    @user = User.all
  end

  # {"id"=>"1", "venue"=>"Crown Royal Hotel", "address"=>"1 Main St. Woburn, MA", "dateTime"=>"2017-05-30T19:00:00.000Z", "description"=>"playaing a gala for my church", "user_id"=>"1", "gig"=>{"id"=>"1", "venue"=>"Crown Royal Hotel", "address"=>"1 Main St. Woburn, MA", "description"=>"playaing a gala for my church"}}

  def update
    gig = Gig.find(params[:gig][:id])
    gig.update(gig_params)
    gig.update(event_date: params[:dateTime])
    user_gigs = Gig.where(user_id: params[:user_id])
    render json: gig
  end

  def gig_params
    params.fetch(:gig).permit(
    :venue,
    :address,
    :dateTime,
    :description)
  end
end
