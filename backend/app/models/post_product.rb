# == Schema Information
#
# Table name: post_products
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :bigint           not null
#  product_id :bigint           not null
#
# Indexes
#
#  index_post_products_on_post_id     (post_id)
#  index_post_products_on_product_id  (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (post_id => posts.id)
#  fk_rails_...  (product_id => products.id)
#
class PostProduct < ApplicationRecord
  belongs_to :post
  belongs_to :product
end
