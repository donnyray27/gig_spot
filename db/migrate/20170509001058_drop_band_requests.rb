class DropBandRequests < ActiveRecord::Migration[5.0]
  def change
    drop_table :band_requests
    drop_table :band_request_genres
    drop_table :band_request_instruments
  end
end
