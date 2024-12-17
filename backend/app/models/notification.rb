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
class Notification < ApplicationRecord
  belongs_to :post, optional: true
  belongs_to :user
  belongs_to :notified_by, class_name: 'User'

  enum :notification_type, { new_comment: 0, new_like: 1, new_follower: 2 }

  def self.create_notification(post = nil, user, notified_by, notification_type)
    # 同一ユーザー、コメント以外の登録済の通知の場合は通知を作成しない
    return if user == notified_by ||
              (notification_type != :new_comment &&
               exists?(post:, user:, notified_by:, notification_type:))

    create(post:, user:, notified_by:, notification_type:, read: false)
  end
end
