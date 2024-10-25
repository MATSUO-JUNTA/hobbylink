class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio

  def image
    object.image.attached? ? Rails.application.routes.url_helpers.rails_blob_url(object.image, only_path: true) : nil
  end
end
