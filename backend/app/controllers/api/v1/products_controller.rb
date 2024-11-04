class Api::V1::ProductsController < ApplicationController
  def show
  end

  def search
    return unless params[:keyword]

    products = RakutenWebService::Ichiba::Item.search(keyword: params[:keyword]).first(20)
    render json: products, status: :ok
  end
end
