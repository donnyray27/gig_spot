class GigRequestsController < ApplicationController

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
    @all_genres = Genre.all.pluck(:name)
    @all_instruments = Instrument.all.pluck(:name)
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

end
