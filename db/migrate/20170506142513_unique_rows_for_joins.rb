class UniqueRowsForJoins < ActiveRecord::Migration[5.0]
  def change
    add_index :band_request_genres, [:band_request_id, :genre_id], unique: true, name: 'unique_band_req_genre'
    add_index :band_request_instruments, [:band_request_id, :instrument_id], unique: true, name: 'unique_band_req_inst'
    add_index :gig_genres, [:gig_id, :genre_id], unique: true, name: 'unique_gig_genre'
    add_index :gig_request_instruments, [:gig_request_id, :instrument_id], unique: true, name: 'unique_gig_req_inst'
    add_index :user_genres, [:user_id, :genre_id], unique: true, name: 'unique_user_genres'
    add_index :user_instruments, [:user_id, :instrument_id], unique: true, name: 'unique_user_instruments'
  end
end
