class RenameGigRequestAuditions < ActiveRecord::Migration[5.0]
  def change
    rename_table(:gig_request_auditions, :auditions)
  end
end
