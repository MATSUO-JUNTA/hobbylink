class CreateNotifications < ActiveRecord::Migration[7.2]
  def change
    create_table :notifications do |t|
      t.references :post, null: true, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :notified_by, null: false, foreign_key: { to_table: :users }
      t.integer :notification_type, null: false 
      t.boolean :read, default: false, null: false

      t.timestamps
    end
  end
end
