class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :name, null:false
      t.string :email, null:false
      t.text :bio
      t.string :provider, null:false

      t.timestamps
    end
    add_index :users,[:email, :provider], unique: true
  end
end
