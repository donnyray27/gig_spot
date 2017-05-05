class FixGigReqDate < ActiveRecord::Migration[5.0]
  def change
    change_column :gig_requests, :event_date, :date, null: false
  end
end
