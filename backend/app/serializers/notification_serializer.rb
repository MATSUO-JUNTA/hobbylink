# == Schema Information
#
# Table name: notifications
#
#  id                :bigint           not null, primary key
#  notification_type :integer          not null
#  read              :boolean          default(FALSE), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  notified_by_id    :bigint           not null
#  post_id           :bigint
#  user_id           :bigint           not null
#
# Indexes
#
#  index_notifications_on_notified_by_id  (notified_by_id)
#  index_notifications_on_post_id         (post_id)
#  index_notifications_on_user_id         (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (notified_by_id => users.id)
#  fk_rails_...  (post_id => posts.id)
#  fk_rails_...  (user_id => users.id)
#
class NotificationSerializer < ApplicationSerializer
  attributes :id, :post_id, :user_id, :notification_type, :read, :created_at

  belongs_to :notified_by, serializer: NotificationUserSerializer

  def notification_type
    case object.notification_type
    when 'new_comment'
      'コメント'
    when 'new_like'
      'いいね'
    when 'new_follower'
      'フォロー'
    else
      ''
    end
  end

  def created_at
    format_created_at(object.created_at)
  end
end
