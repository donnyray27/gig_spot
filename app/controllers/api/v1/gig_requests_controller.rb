class Api::V1::GigRequestsController < ApplicationController

  skip_before_action  :verify_authenticity_token

  def create
    user = current_user
    binding.pry
    gig_req = GigRequest.create(
    title: params[:title],
    event_date: params[:event_date],
    description: params[:description],
    user_id: user.id
    )
    if params[:genres]
      params[:genres].each do |genre|
        genre = Genre.find_by(name: genre)
        gig_genre_req = GigRequestGenre.create(gig_request_id: gig_req.id, genre_id: genre.id)
      end
    end
    if params[:instruments]
      params[:instruments].each do |instrument|
        instrument = Instrument.find_by(name: instrument)
        gig_instr_req = GigRequestInstrument.create(gig_request_id: gig_req.id, instrument_id: instrument.id)
      end
    end

    @gig_requests = []
    all_gig_requests = GigRequest.all
    all_gig_requests.each do |gig_request|
      gig_genres = gig_request.genres.pluck(:name)
      gig_instruments = gig_request.instruments.pluck(:name)
      @gig_requests << {
                          details: gig_request,
                          genres: gig_genres,
                          instruments: gig_instruments
                        }
    end
    @all_genres = Genre.all.pluck(:name)
    @all_instruments = Instrument.all.pluck(:name)
    binding.pry
    render json: @gig_requests
  end

  private
  def gig_req_params
    params.permit(
      :title,
      :event_date,
      :description,
      :genres,
      :instruments
      )

  end
end
