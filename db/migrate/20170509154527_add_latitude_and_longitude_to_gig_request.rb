class AddLatitudeAndLongitudeToGigRequest < ActiveRecord::Migration[5.0]
  def change
    add_column :gig_requests, :latitude, :float
    add_column :gig_requests, :longitude, :float
  end
end
