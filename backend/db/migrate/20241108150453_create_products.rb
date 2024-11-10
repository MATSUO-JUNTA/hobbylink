class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :name, null:false
      t.text :details
      t.decimal :price, null:false
      t.string :product_url, null:false

      t.timestamps
    end
  end
end
