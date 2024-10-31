class AddUniqueIndexToUser < ActiveRecord::Migration[7.2]
  def change
    add_index :users, :email, unique: true
    add_index :users, :provider, unique: true
  end
end
