class CreateGigRequestInstruments < ActiveRecord::Migration[5.0]
  def change
    create_table :gig_request_instruments do |t|
      t.belongs_to :gig_request, index: true
      t.belongs_to :instrument, index: true

      t.timestamps null: false
    end
  end
end
