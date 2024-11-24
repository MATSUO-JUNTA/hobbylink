class UserPostSerializer < ApplicationSerializer
  include Rails.application.routes.url_helpers

  attributes :id, :image

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end
end
