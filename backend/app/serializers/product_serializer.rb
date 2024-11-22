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
