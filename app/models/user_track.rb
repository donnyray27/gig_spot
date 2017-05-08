class UserTrack < ApplicationRecord
  validates :spotify_uri, presence: true

  belongs_to :user
end
