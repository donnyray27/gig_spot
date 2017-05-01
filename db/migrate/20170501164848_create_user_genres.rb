class CreateUserGenres < ActiveRecord::Migration[5.0]
  def change
    create_table :user_genres do |t|
      t.belongs_to :user, index: true
      t.belongs_to :genre, index: true
    end
  end
end
