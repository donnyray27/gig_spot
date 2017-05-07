class GigRequestAudition < ApplicationRecord
  validates :name, presence: true

  belongs_to :gig_request
  belongs_to :user
end
