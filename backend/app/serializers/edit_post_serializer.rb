class EditPostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :image, :content
  belongs_to :category, serializer: EditCategorySerializer
  has_many   :products, serializer: EditProductSerializer

  def image
    object.image.attached? ? rails_blob_url(object.image, host: UrlHost.host) : nil
  end
end
