class Api::V1::UsersController < ApplicationController
before_action :require_login
  def index
    @user = User.all
  end

  def update
    user = User.find(params[:id])
      if params[:genreUpdate]
        if user == current_user
          current_user_genres = user.genres.pluck(:name)
          fetched_genres = params[:genreUpdate]

          compare = current_user_genres & fetched_genres

          fetched_genres -= compare
          current_user_genres -= compare

          fetched_genres.each do |addition|
            genre = Genre.find_by(name: addition)
            UserGenre.create(user_id: user.id, genre_id: genre.id)
          end

          current_user_genres.each do |subtraction|
            genre = Genre.find_by(name: subtraction)
            delete = UserGenre.find_by(user_id: user.id, genre_id: genre.id)
            delete.destroy
          end

          user_genres = user.genres.pluck(:name)
          render json: user_genres
        else
          user_genres = user.genres.pluck(:name)
          render json: user_genres
        end
      end

      if params[:instrumentUpdate]
        if user == current_user
          current_user_instruments = user.instruments.pluck(:name)
          fetched_instruments = params[:instrumentUpdate]

          compare = current_user_instruments & fetched_instruments

          fetched_instruments -= compare
          current_user_instruments -= compare

          fetched_instruments.each do |addition|
            instrument = Instrument.find_by(name: addition)
            UserInstrument.create(user_id: user.id, instrument_id: instrument.id)
          end

          current_user_instruments.each do |subtraction|
            instrument = Instrument.find_by(name: subtraction)
            delete = UserInstrument.find_by(user_id: user.id, instrument_id: instrument.id)
            delete.destroy
          end

          user_instruments = user.instruments.pluck(:name)
          render json: user_instruments
        else
          user_instruments = user.instruments.pluck(:name)
          render json: user_instruments
        end
      end

      if params[:bioUpdate]
        if user == current_user
          user.update(bio: params[:bioUpdate])
          render json: user
        else
          render json: user
        end
      end


  end

  def destroy
    user = User.find(params[:id])
    user.instruments.destroy_all
    user.genres.destroy_all
    user.gig_requests.destroy_all
    user.gigs.destroy_all
    user.auditions.destroy_all
    user.user_tracks.destroy_all
    user.delete

    @users = User.where("role = 'member'").order(first_name: :asc)

    render json: @users
  end

  private
  def user_params
    params.permit(
    :genreUpdate,
    :instrumentUpdate,
    :bioUpdate,
    :id
    )
  end
end
