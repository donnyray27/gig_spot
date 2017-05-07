class AuditionsController < ApplicationController

  def new
    gig_request = GigRequest.find(params[:gig_request_id])
    gig_genres = gig_request.genres.pluck(:name)
    gig_instruments = gig_request.instruments.pluck(:name)
    @gig_request = {
      details: gig_request,
      genres: gig_genres,
      instruments: gig_instruments
    }
  end
end
