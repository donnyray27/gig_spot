class Genre < ApplicationRecord

  has_many :user_genres
  has_many :users, through: :user_genres

  has_many :gig_genres
  has_many :gigs, through: :gig_genres

  has_many :band_request_genres
  has_many :band_requests, through: :band_request_genres

  has_many :gig_request_genres
  has_many :gig_requests, through: :gig_request_genres
end
