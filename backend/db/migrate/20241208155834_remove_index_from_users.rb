class RemoveIndexFromUsers < ActiveRecord::Migration[7.2]
  def change
    remove_index :users, :provider if index_exists?(:users, :provider)
  end
end
