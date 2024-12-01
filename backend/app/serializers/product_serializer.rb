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
class ProductSerializer < ApplicationSerializer
  include Rails.application.routes.url_helpers

  attributes :id, :image, :name, :details, :price, :product_url

  has_many :posts, serializer: ProductPostSerializer

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end

  def details
    object.details.gsub('。', "。\n")
  end

  def price
    object.price.to_i.to_fs(:delimited)
  end
end
