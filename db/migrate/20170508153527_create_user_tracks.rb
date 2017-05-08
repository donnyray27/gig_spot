class CreateUserTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :user_tracks do |t|
      t.belongs_to :user, index: true
      t.string :spotify_uri, null: false

      t.timestamps null: false
    end
  end
end
