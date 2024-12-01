class CommentSerializer < ApplicationSerializer
  attributes :id, :content, :created_at

  belongs_to :user, serializer: CommentUserSerializer

  def created_at
    format_created_at(object.created_at)
  end
end
