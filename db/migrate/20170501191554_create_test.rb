class CreateTest < ActiveRecord::Migration[5.0]
  def change
    create_table :tests do |t|
      t.datetime :dt_test
      t.date :date
      t.time :time
    end
  end
end
