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
class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :post_products, dependent: :destroy
  has_many :products, through: :post_products

  validates :content, presence: true, length: { maximum: 500 }

  has_one_attached :image
end
