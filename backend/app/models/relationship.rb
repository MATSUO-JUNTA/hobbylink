# == Schema Information
#
# Table name: relationships
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  followed_id :bigint           not null
#  follower_id :bigint           not null
#
# Indexes
#
#  index_relationships_on_followed_id  (followed_id)
#  index_relationships_on_follower_id  (follower_id)
#
# Foreign Keys
#
#  fk_rails_...  (followed_id => users.id)
#  fk_rails_...  (follower_id => users.id)
#
class Relationship < ApplicationRecord
  belongs_to :follower, class_name: 'User'
  belongs_to :followed, class_name: 'User'

  after_create :create_notification

  private

  def create_notification
    Notification.create_notification(nil, followed, follower, :new_follower)
  end
end
