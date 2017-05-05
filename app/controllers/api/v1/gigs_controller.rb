class Api::V1::GigsController < ApplicationController

  skip_before_action  :verify_authenticity_token

  def index
    @user = User.all
  end

  def create
    gig = Gig.new(gig_params)
    gig.event_date = params[:dateTime]
    user = User.find(params[:user_id])
    gig.user = user
    gig.save
    user_gigs = Gig.where(user_id: params[:user_id])
    render json: user_gigs
  end

  def update
    gig = Gig.find(params[:gig][:id])
    gig.update(gig_params)
    gig.update(event_date: params[:dateTime])
    user_gigs = Gig.where(user_id: params[:user_id])
    render json: user_gigs
  end

  def destroy
    gig = Gig.find(params[:id])
    gig.destroy
    user_gigs = Gig.where(user_id: params[:user_id])
    render json: user_gigs
  end

  private
  def gig_params
    params.fetch(:gig).permit(
    :venue,
    :address,
    :dateTime,
    :description)
  end
end
