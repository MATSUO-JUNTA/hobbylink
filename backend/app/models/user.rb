# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  bio        :text
#  email      :string           not null
#  name       :string           not null
#  provider   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_users_on_email               (email) UNIQUE
#  index_users_on_email_and_provider  (email,provider) UNIQUE
#  index_users_on_provider            (provider) UNIQUE
#
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :name,      presence: true
  validates :email,     presence: true, uniqueness: true
  validates :image,     presence: true
  validates :bio,       length: { maximum: 200 }
  validates :provider,  presence: true, uniqueness: true

  has_one_attached :image
end
