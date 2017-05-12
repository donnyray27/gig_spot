class GigRequest < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :address, presence: true
  validates :event_date, presence: true

  belongs_to :user
  has_many :gig_request_genres
  has_many :genres, through: :gig_request_genres

  has_many :gig_request_instruments
  has_many :instruments, through: :gig_request_instruments

  has_many :auditions

  geocoded_by :address
  after_validation :geocode, :if => :address_changed?

end
