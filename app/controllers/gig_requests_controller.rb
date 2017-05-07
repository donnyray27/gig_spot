class GigRequestsController < ApplicationController

  skip_before_action  :verify_authenticity_token

  def index
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
    @all_genres = Genre.all.order(name: :asc).pluck(:name)
    @all_instruments = Instrument.all.order(name: :asc).pluck(:name)
  end

  def show
    @gig_request = {}
    gig_requested = GigRequest.find(params[:id])
    gig_genres = gig_requested.genres.pluck(:name)
    gig_instruments = gig_requested.instruments.pluck(:name)
    @gig_request = {
      details: gig_requested,
      genres: gig_genres,
      instruments: gig_instruments
    }
    @all_genres = Genre.all.pluck(:name)
    @all_instruments = Instrument.all.pluck(:name)
  end

  def destroy
    gig_request = GigRequest.find(params[:id])
    gig_request_instruments = GigRequestInstrument.where(gig_request_id: gig_request.id)
    gig_request_genres = GigRequestGenre.where(gig_request_id: gig_request.id)
    unless gig_request_instruments.empty?
      gig_request_instruments.each do |instrument|
        instrument.destroy
      end
    end

    unless gig_request_genres.empty?
      gig_request_genres.each do |genre|
        genre.destroy
      end
    end

    gig_request.destroy

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
    

  end


end
