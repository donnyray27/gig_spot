class BandRequestInstrument < ApplicationRecord
  belongs_to :band_request
  belongs_to :instrument
end
