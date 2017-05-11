class Api::V1::UserTracksController < ApplicationController


  def create
    user = User.find(params[:user_id])
    user_track = UserTrack.new(user_track_params)
    user_track.save

    user_tracks = user.user_tracks
    render json: user_tracks
  end

  def destroy
    user_track = UserTrack.find(params[:id])
    user_track.destroy
    user = User.find(params[:user_id])
    user_tracks = user.user_tracks
    render json: user_tracks
  end

  private
  def user_track_params
    params.permit(
    :user_id,
    :spotify_uri
    )
  end
end
