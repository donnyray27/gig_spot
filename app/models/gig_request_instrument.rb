class GigRequestInstrument < ApplicationRecord
  belongs_to :gig_request
  belongs_to :instrument
end
