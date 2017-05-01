class CreateBandRequestInstruments < ActiveRecord::Migration[5.0]
  def change
    create_table :band_request_instruments do |t|
      t.belongs_to :band_request, index: true
      t.belongs_to :instrument, index: true

      t.timestamps null: false
    end
  end
end
