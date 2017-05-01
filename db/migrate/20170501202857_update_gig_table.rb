class UpdateGigTable < ActiveRecord::Migration[5.0]
  def change
    add_column :gigs, :event_date, :datetime, null: false
  end
end
