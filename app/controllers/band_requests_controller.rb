class BandRequestsController < ApplicationController

  def index
    @band_reqs = []
    all_band_reqs = BandRequest.all
    all_band_reqs.each do |band_req|
       req_genres = band_req.genres.pluck(:name)
      req_instruments = band_req.instruments.pluck(:name)
      @band_reqs << {
                          details: band_req,
                          genres: req_genres,
                          instruments: req_instruments
                        }
    end
  end

  def show

  end
end
