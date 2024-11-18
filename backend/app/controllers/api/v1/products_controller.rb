class Api::V1::ProductsController < ApplicationController
  def show
  end

  def search
    return unless params[:keyword]

    response = RakutenWebService::Ichiba::Item.search(keyword: params[:keyword]).first(20)

    products = []

    response.each do |product|
      products << {
        id: product['item_code'],
        name: product['item_name'],
        details: product['item_caption'],
        price: product['item_price'],
        image: product['mediumImageUrls'][0].gsub('?_ex=128x128', ''),
        product_url: product['affiliate_url']
      }
    end

    render json: products, status: :ok
  end
end
