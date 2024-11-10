class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :image, :content, :created_at

  belongs_to :user,     serializer: PostUserSerializer
  belongs_to :category, serializer: PostCategorySerializer
  has_many   :products, serializer: PostProductSerializer

  def image
    object.image.attached? ? rails_blob_url(object.image) : nil
  end

  def created_at
    diff_time = Time.current - object.created_at

    case diff_time
    when 0..60
      "#{diff_time.to_i}秒前"
    when 60..3600
      "#{(diff_time / 60).to_i}分前"
    when 3600..86_400
      "#{(diff_time / 3600).to_i}時間前"
    when 86_400..604_800
      "#{(diff_time / 86_400).to_i}日前"
    else
      object.created_at.strftime('%Y年%m月%日')
    end
  end
end
