class GigRequestGenre < ApplicationRecord
  belongs_to :gig_request
  belongs_to :genre
end
