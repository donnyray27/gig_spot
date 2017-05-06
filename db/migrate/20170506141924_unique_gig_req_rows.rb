class UniqueGigReqRows < ActiveRecord::Migration[5.0]
  def change
    add_index :gig_request_genres, [:gig_request_id, :genre_id ], unique: true
  end
end
