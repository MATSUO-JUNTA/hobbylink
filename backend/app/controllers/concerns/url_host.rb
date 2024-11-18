module UrlHost
  extend ActiveSupport::Concern

  def self.host
    Rails.env.production? ? 'hobbylink-66d327f4790b.herokuapp.com' : 'localhost:3000'
  end
end
