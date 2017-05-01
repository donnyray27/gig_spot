class Gig < ApplicationRecord
  belongs_to :user
  has_many :gig_genres
  has_many :genres, through: :gig_genres
end
