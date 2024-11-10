# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  details     :text
#  name        :string           not null
#  price       :decimal(, )      not null
#  product_url :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Product < ApplicationRecord
  has_many :post_products, dependent: :destroy
  has_many :posts, through: :post_products

  validates :name,        presence: true
  validates :price,       presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :product_url, presence: true

  has_one_attached :image
end
