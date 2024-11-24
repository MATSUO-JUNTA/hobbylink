class ShowUserSerializer < ApplicationSerializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :image, :bio

  def image
    object.image.attached? ? rails_blob_url(object.image, host: UrlHost.host) : nil
  end
end
