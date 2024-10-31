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
class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :image, :bio, :token

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end

  def token
    @instance_options[:token]
  end
end
