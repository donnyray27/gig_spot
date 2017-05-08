class Gig < ApplicationRecord
  validates :venue, presence: true
  validates :address, presence: true

  belongs_to :user
  has_many :gig_genres
  has_many :genres, through: :gig_genres

  geocoded_by :address
  after_validation :geocode, :if => :address_changed?

end

# <% for location in @location.nearbys(30) %>
#
# <% end %>
