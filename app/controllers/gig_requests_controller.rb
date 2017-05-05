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
  end

  def show

  end
end
