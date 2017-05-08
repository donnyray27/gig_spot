class AddLatitudeAndLongitudeToGig < ActiveRecord::Migration[5.0]
  def change
    add_column :gigs, :latitude, :float
    add_column :gigs, :longitude, :float
  end
end
