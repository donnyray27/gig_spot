class Api::V1::GigRequestsController < ApplicationController

  skip_before_action  :verify_authenticity_token

  def create
    user = current_user
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
    render json: @gig_requests
  end

  def update
    user = current_user
    gig_req = GigRequest.find(params[:id])
    gig_req.update(
    title: params[:title],
    event_date: params[:event_date],
    description: params[:description],
    user_id: user.id
    )
    gig_req_genres = gig_req.genres.pluck(:name)
    fetched_genres = params[:genres]

    gig_req_instruments = gig_req.instruments.pluck(:name)
    fetched_instruments = params[:instruments]

    if params[:genres]
      compare = gig_req_genres & fetched_genres
      fetched_genres -= compare
      gig_req_genres -= compare

      fetched_genres.each do |addition|
        genre = Genre.find_by(name: addition)
        GigRequestGenre.create(gig_request_id: gig_req.id, genre_id: genre.id)
      end

      gig_req_genres.each do |subtraction|
        genre = Genre.find_by(name: subtraction)
        delete = GigRequestGenre.find_by(gig_request_id: gig_req.id, genre_id: genre.id)
        delete.destroy
      end
    end

    if params[:instruments]
      compare = gig_req_instruments & fetched_instruments
      fetched_instruments -= compare
      gig_req_instruments -= compare

      fetched_instruments.each do |addition|
        instrument = Instrument.find_by(name: addition)
        GigRequestInstrument.create(gig_request_id: gig_req.id, instrument_id: instrument.id)
      end

      gig_req_instruments.each do |subtraction|
        instrument = Instrument.find_by(name: subtraction)
        delete = GigRequestInstrument.find_by(gig_request_id: gig_req.id, instrument_id: instrument.id)
        delete.destroy
      end
    end

    @gig_request = {}
    gig_requested = GigRequest.find(params[:id])
    gig_genres = gig_requested.genres.pluck(:name)
    gig_instruments = gig_requested.instruments.pluck(:name)
    @gig_request = {
      details: gig_requested,
      genres: gig_genres,
      instruments: gig_instruments
    }
    render json: @gig_request
  end


  private
  def gig_req_params
    params.permit(
      :title,
      :event_date,
      :description,
      :genres,
      :instruments,
      :id
      )

  end
end
