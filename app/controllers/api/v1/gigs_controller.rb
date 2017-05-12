class Api::V1::GigsController < ApplicationController

before_action :require_login
  def index
    @gigs = Gig.all
    @hash = Gmaps4rails.build_markers(@gigs) do |gig, marker|
      marker.lat gig.latitude
      marker.lng gig.longitude
      marker.title generate_title(gig)
    end
    render json: @hash
  end

  def create
    gig = Gig.new(gig_params)
    gig.event_date = params[:dateTime]
    user = User.find(params[:user_id])
    gig.user = user
    gig.save
    if params[:genres]
      params[:genres].each do |genre|
        genre = Genre.find_by(name: genre)
        GigGenre.create(gig_id: gig.id, genre_id: genre.id)
      end
    end
    user_gigs = Gig.where(user_id: params[:user_id]).order(event_date: :desc)

    user_gigs_json = []
    user_gigs.each do |gig|
      user_gigs_json << {
                      data: gig,
                      genres: gig.genres.pluck(:name)
      }
    end

    render json: user_gigs_json
  end

  def update
    gig = Gig.find(params[:gig][:id])
    gig.update(gig_params)
    gig.update(event_date: params[:dateTime])
    gig_genres = gig.genres.pluck(:name)
    fetched_genres = params[:genres]

    if params[:genres]
      compare = gig_genres & fetched_genres
      fetched_genres -= compare
      gig_genres -= compare

      fetched_genres.each do |addition|
        genre = Genre.find_by(name: addition)
        GigGenre.create(gig_id: gig.id, genre_id: genre.id)
      end

      gig_genres.each do |subtraction|
        genre = Genre.find_by(name: subtraction)
        delete = GigGenre.find_by(gig_id: gig.id, genre_id: genre.id)
        delete.destroy
      end
    end

    user_gigs = Gig.where(user_id: params[:user_id]).order(event_date: :desc)

    user_gigs_json = []
    user_gigs.each do |gig|
      user_gigs_json << {
                      data: gig,
                      genres: gig.genres.pluck(:name)
      }
    end

    render json: user_gigs_json
  end

  def destroy
    gig = Gig.find(params[:id])
    gig_genres = gig.genres
    unless gig_genres.empty?
      gig_genres.each do |gig_genre|
        gig_genre.destroy
      end
    end
    gig.destroy
    user_gigs = Gig.where(user_id: params[:user_id]).order(event_date: :desc)

    user_gigs_json = []
    user_gigs.each do |gig|
      user_gigs_json << {
                      data: gig,
                      genres: gig.genres.pluck(:name)
      }
    end

    render json: user_gigs_json
  end

  private
  def gig_params
    params.fetch(:gig).permit(
    :id,
    :venue,
    :address,
    :dateTime,
    :description,
    :genres)
  end

  def generate_title(gig)
    return "#{gig.user.first_name} #{gig.user.last_name}:\n
            #{gig.venue}\n
            #{gig.address} | #{gig.event_date.strftime("%D at %I:%M%p")}\n
            #{gig.description}"
  end
end
