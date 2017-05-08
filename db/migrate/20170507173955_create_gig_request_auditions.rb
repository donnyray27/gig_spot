class CreateGigRequestAuditions < ActiveRecord::Migration[5.0]
  def change
    create_table :gig_request_auditions do |t|
      t.belongs_to :gig_request, index: true
      t.belongs_to :user, index: true
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
