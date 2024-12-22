class RelationshipSerializer < ApplicationSerializer
  include Rails.application.routes.url_helpers

  attributes :id, :image, :name, :bio

  def image
    object.image.attached? ? rails_blob_url(object.image, host: UrlHost.host) : nil
  end
end
