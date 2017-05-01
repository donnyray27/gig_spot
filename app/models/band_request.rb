class BandRequest < ApplicationRecord
  validates :title, presence: true
  validates :name, presence: true
  validates :description, presence: true

  belongs_to :user
  has_many :band_request_genres
  has_many :genres, through: :band_request_genres

  has_many :band_request_instruments
  has_many :instruments, through: :band_request_instruments
end
