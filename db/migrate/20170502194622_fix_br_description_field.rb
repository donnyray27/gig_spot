class FixBrDescriptionField < ActiveRecord::Migration[5.0]
  def change
    remove_column :band_requests, :decription
    add_column :band_requests, :description, :string, null: false
  end
end
