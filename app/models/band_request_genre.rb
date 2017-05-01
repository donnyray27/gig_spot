class BandRequestGenre < ApplicationRecord
  belongs_to :band_request
  belongs_to :genre
end
