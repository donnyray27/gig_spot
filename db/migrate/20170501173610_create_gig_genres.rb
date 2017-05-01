class CreateGigGenres < ActiveRecord::Migration[5.0]
  def change
    create_table :gig_genres do |t|
      t.belongs_to :gig, index: true
      t.belongs_to :genre, index: true

      t.timestamps null: false
    end
  end
end
