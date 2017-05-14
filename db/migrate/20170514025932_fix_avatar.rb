class FixAvatar < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :avatar, :string, default: nil
  end
end