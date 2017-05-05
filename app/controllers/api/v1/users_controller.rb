class Api::V1::UsersController < ApplicationController

    skip_before_action  :verify_authenticity_token
  def index
    @user = User.all
  end

  def update
    user = User.find(params[:id])
    if params[:genreUpdate]
      current_user_genres = user.genres.pluck(:name)
      fetched_genre = params[:genreUpdate]
      if current_user_genres.include?(fetched_genre)
        genre = Genre.find_by(name: fetched_genre)
        user_genre = UserGenre.find_by(user_id: user.id, genre_id: genre.id)
        user_genre.destroy
      else
        genre = Genre.find_by(name: fetched_genre)
        user_genre = UserGenre.create(user_id: user.id, genre_id: genre.id)
      end
      user_genres = user.genres.pluck(:name)
      render json: user_genres
    end

    if params[:instrumentUpdate]
      current_user_instruments = user.instruments.pluck(:name)
      fetched_instrument = params[:instrumentUpdate]
      if current_user_instruments.include?(fetched_instrument)
        instrument = Instrument.find_by(name: fetched_instrument)
        user_instrument = UserInstrument.find_by(user_id: user.id, instrument_id: instrument.id)
        user_instrument.destroy
      else
        instrument = Instrument.find_by(name: fetched_instrument)
        user_instrument = UserInstrument.create(user_id: user.id, instrument_id: instrument.id)
      end
      user_instruments = user.instruments.pluck(:name)
      render json: user_instruments
    end

  end

  private
  def user_params
    params.permit(
    :genreUpdate,
    :instrumentUpdate
    )
  end
end
