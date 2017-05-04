class UsersController < ApplicationController

  def index
  end

  def show
    @user = User.find(params[:id])
    @user_instruments = @user.instruments
    @user_genres = @user.genres
    @user_gigs = @user.gigs
    @user_gig_requests = @user.gig_requests
    @user_band_requests = @user.band_requests
    @all_genres = Genre.all
  end
end
