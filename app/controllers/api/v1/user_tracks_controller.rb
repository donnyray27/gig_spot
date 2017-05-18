class Api::V1::UserTracksController < ApplicationController

before_action :require_login
  def create
    user = User.find(params[:user_id])
    if user == current_user
      user_track = UserTrack.new(user_track_params)
      user_track.save

      user_tracks = user.user_tracks
      render json: user_tracks
    else
      flash[:alert] = 'Unauthorized User. Could not create record.'
      user_tracks = user.user_tracks
      render json: user_tracks
    end
  end

  def destroy
    user_track = UserTrack.find(params[:id])
    user = User.find(params[:user_id])
    if user_track.user == current_user
      user_track.destroy
      user_tracks = user.user_tracks
      render json: user_tracks
    else
      flash.now[:alert] = 'Unauthorized User. Could not delete record.'
      user_tracks = user.user_tracks
      render json: user_tracks
    end
  end

  private
  def user_track_params
    params.permit(
    :user_id,
    :spotify_uri
    )
  end
end
