class Instrument < ApplicationRecord

  has_many :user_instruments
  has_many :instruments, through: :user_instruments

  has_many :band_request_instruments
  has_many :band_requests, through: :band_request_instruments

  has_many :gig_request_instruments
  has_many :gig_requests, through: :gig_request_instruments
end
