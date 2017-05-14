class DefaultAvatar < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :avatar, :string, default: "https://s3.amazonaws.com/gigspotdevelopment/uploads/user/avatar/5/default-profile.gif"
  end
end
