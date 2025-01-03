class EditProductSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :image, :price, :details, :product_url

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end

  def price
    object.price.to_i
  end
end
