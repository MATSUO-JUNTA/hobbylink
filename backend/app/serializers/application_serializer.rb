class ApplicationSerializer < ActiveModel::Serializer
  def format_created_at(created_at)
    diff_time = Time.current - created_at

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
      created_at.strftime('%Y年%m月%d日')
    end
  end
end
