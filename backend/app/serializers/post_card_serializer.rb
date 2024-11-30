class PostCardSerializer < ApplicationSerializer
  include Rails.application.routes.url_helpers

  attributes :id, :image, :content, :created_at, :like_count, :is_liked

  belongs_to :user, serializer: PostUserSerializer

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end

  def created_at
    format_created_at(object.created_at)
  end
end
