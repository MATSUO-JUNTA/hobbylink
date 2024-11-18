class PostUserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :image, :name

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end
end
