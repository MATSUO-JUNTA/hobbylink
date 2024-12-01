# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  content     :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_posts_on_category_id  (category_id)
#  index_posts_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (user_id => users.id)
#
class PostSerializer < ApplicationSerializer
  include Rails.application.routes.url_helpers

  attributes :id, :image, :content, :created_at, :like_count, :is_liked, :comment_count

  belongs_to :user,     serializer: PostUserSerializer
  belongs_to :category, serializer: PostCategorySerializer
  has_many   :products, serializer: PostProductSerializer

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end

  def created_at
    format_created_at(object.created_at)
  end
end
