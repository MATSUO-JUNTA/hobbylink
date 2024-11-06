class Api::V1::ProductsController < ApplicationController
  def show
  end

  def search
    return unless params[:keyword]

    response = RakutenWebService::Ichiba::Item.search(keyword: params[:keyword]).first(20)

    products = []

    response.each do |product|
      products << {
        item_code: product['item_code'],
        item_name: product['item_name'],
        item_caption: product['item_caption'],
        item_price: product['item_price'],
        mediumImageUrls: product['mediumImageUrls'][0].gsub('?_ex=128x128', ''),
        item_url: product['affiliate_url']
      }
    end

    render json: products, status: :ok
  end
end
