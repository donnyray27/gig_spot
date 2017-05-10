class AddLocationColumn < ActiveRecord::Migration[5.0]
  def change
    add_column :gig_requests, :location, :string, null: false
  end
end
