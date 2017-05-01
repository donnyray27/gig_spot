class CreateGigRequestGenres < ActiveRecord::Migration[5.0]
  def change
    create_table :gig_request_genres do |t|
      t.belongs_to :gig_request, index: true
      t.belongs_to :genre, index: true

      t.timestamps null: false
    end
  end
end
