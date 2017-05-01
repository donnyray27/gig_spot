class RecreateGigRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :gig_requests do |t|
      t.string :title, null: false
      t.datetime :event_date, null: false
      t.string :description, null: false

      t.belongs_to :user, index: true
      t.timestamps null: false
    end
  end
end
