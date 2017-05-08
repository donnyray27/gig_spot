class AddColumnToAuditions < ActiveRecord::Migration[5.0]
  def change
    add_column :auditions, :video_id, :string
  end
end
