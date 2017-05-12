class Api::V1::UsersController < ApplicationController
before_action :require_login
  def index
    @user = User.all
  end

  def update
    user = User.find(params[:id])
    if params[:genreUpdate]
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
    end

    if params[:instrumentUpdate]
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
    end

    if params[:bioUpdate]
      user.update(bio: params[:bioUpdate])
      render json: user
    end

  end

  private
  def user_params
    params.permit(
    :genreUpdate,
    :instrumentUpdate,
    :bioUpdate
    )
  end
end
