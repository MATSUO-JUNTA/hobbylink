require 'open-uri'

class Api::V1::PostsController < ApplicationController
  before_action :authenticate, only: [:create, :edit]

  def show
    posts = Post.includes(:user, :category, :products).find(params[:id])
    render json: posts, status: :ok
  end

  def edit
    post = @current_user.posts.includes(:products).find(params[:id])
    render json: post, serializer: EditPostSerializer, status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      post = @current_user.posts.new(post_params)

      if post.save!
        products = JSON.parse(product_params[:products])

        products.each do |product|
          new_product = Product.find_or_create_by!(product_url: product['productUrl']) do |prod|
            prod.name = product['name']
            prod.details = product['details']
            prod.price = product['price']
            if product['image'].present?
              uri = URI.parse(product['image'])
              prod.image.attach(io: uri.open, filename: "#{prod.id}.jpg")
            end
          end

          post.products << new_product
        end
      end
    end

    head :created
  rescue StandardError
    render json: { error: '投稿に失敗しました' }, status: :unprocessable_entity
  end

  private

  def post_params
    params.permit(:content, :image, :category_id)
  end

  def product_params
    params.permit(:products)
  end
end
