class RenameLocation < ActiveRecord::Migration[5.0]
  def change
    rename_column :gig_requests, :location, :address
  end
end
