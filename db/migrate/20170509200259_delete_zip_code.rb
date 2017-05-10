class DeleteZipCode < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :zip_code
    change_column :users, :bio, :string, null: true
  end
end
