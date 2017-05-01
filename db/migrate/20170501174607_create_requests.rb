class CreateRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :band_requests do |t|
      t.string :title, null: false
      t.string :name, null: false
      t.string :decription, null: false

      t.belongs_to :user, index: true
      t.timestamps null: false
    end
  end
end
