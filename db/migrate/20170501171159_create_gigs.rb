class CreateGigs < ActiveRecord::Migration[5.0]
  def change
    create_table :gigs do |t|
      t.string :venue, null: false
      t.string :address, null: false
      t.string :description

      t.belongs_to :user, index: true
      t.timestamps null: false
    end
  end
end
