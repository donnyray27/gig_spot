class DropGigRequests < ActiveRecord::Migration[5.0]
  def change
    drop_table :gig_requests
    drop_table :tests
  end
end
