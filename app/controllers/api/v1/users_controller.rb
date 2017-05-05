class Api::V1::UsersController < ApplicationController

    skip_before_action  :verify_authenticity_token
  def index
    @user = User.all
  end

  def update
    user = User.find(params[:id])
    current_user_genres = user.genres.pluck(:name)
    if params[:genreUpdate]
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

  end

  private
  def user_params
    params.permit(
    :genreUpdate
    )
  end
end
