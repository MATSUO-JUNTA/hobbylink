require 'open-uri'

class Api::V1::PostsController < ApplicationController
  before_action :authenticate, only: [:create, :edit, :update, :destroy]
  before_action :current_user, only: [:show, :new_posts, :search]
  before_action :set_post, only: [:update, :destroy]

  def show
    posts = Post.includes(:user, :category, :products)
                .left_joins(:likes, :comments)
                .group('posts.id')
                .select("posts.*,
                        COUNT(DISTINCT likes.id) AS like_count,
                        COUNT(comments.id) AS comment_count,
                        EXISTS (
                          SELECT * FROM likes
                          WHERE likes.post_id = posts.id AND likes.user_id = #{@current_user ? @current_user.id : 0}
                        ) AS is_liked")
                .find(params[:id])
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

  def update
    ActiveRecord::Base.transaction do
      if @post.update!(post_params)
        products = JSON.parse(product_params[:products])
        product_urls = @post.products.pluck(:product_url)

        # 商品追加処理
        add_products(products, product_urls)
        # 商品削除処理
        delete_products(products, product_urls)
      end
    end

    head :ok
  rescue StandardError
    render json: { error: '投稿の更新に失敗しました。' }, status: :unprocessable_entity
  end

  def destroy
    ActiveRecord::Base.transaction do
      post_products = Post.includes(products: :posts).find(@post.id)
      if @post.destroy!
        post_products.products.each do |product|
          if product.posts.size == 1
            product.destroy!
          else
            # 他の投稿で使われている場合、関連だけ削除
            @post.products.delete(product)
          end
        end
      end
    end

    head :ok
  rescue StandardError
    render json: { error: '投稿の削除に失敗しました。' }, status: :unprocessable_entity
  end

  def new_posts
    posts = Post.includes(:user)
                .left_joins(:likes, :comments)
                .group('posts.id')
                .select("posts.*,
                        COUNT(DISTINCT likes.id) AS like_count,
                        COUNT(comments.id) AS comment_count,
                        EXISTS (
                          SELECT * FROM likes
                          WHERE likes.post_id = posts.id AND likes.user_id = #{@current_user ? @current_user.id : 0}
                        ) AS is_liked")
                .order(created_at: :desc)
                .page(params[:page]).per(10)
    render json: posts, each_serializer: PostCardSerializer, status: :ok
  end

  def search
    posts = Post.includes(:user)
                .left_joins(:likes, :comments)
                .group('posts.id')
                .select("posts.*,
                        COUNT(DISTINCT likes.id) AS like_count,
                        COUNT(comments.id) AS comment_count,
                        EXISTS (
                          SELECT * FROM likes
                          WHERE likes.post_id = posts.id AND likes.user_id = #{@current_user ? @current_user.id : 0}
                        ) AS is_liked")

    posts = if params[:search_term].present?
              posts.joins(:category).where(
                'posts.content LIKE ? or categories.name LIKE ?',
                "%#{params[:search_term]}%",
                "%#{params[:search_term]}%"
              )
            else
              posts.where(category_id: params[:category_id])
            end

    render json: posts.page(params[:page]).per(10), each_serializer: PostCardSerializer, status: :ok
  end

  def user_posts
    posts = User.includes(:posts).find(params[:id]).posts
    render json: posts, each_serializer: UserPostSerializer, status: :ok
  end

  def like_posts
    posts = User.includes(likes: :post).find(params[:id]).likes.map(&:post)
    render json: posts, each_serializer: UserPostSerializer, status: :ok
  end

  private

  # 商品追加処理
  def add_products(products, product_urls)
    # 追加された商品を取得
    add_product_urls = products.map { |product| product['productUrl'] } - product_urls
    add_products = products.select { |p| add_product_urls.include?(p['productUrl']) }

    add_products.each do |product|
      product = Product.find_or_create_by!(product_url: product['productUrl']) do |new_product|
        new_product.name = product['name']
        new_product.details = product['details']
        new_product.price = product['price']

        if product['image'].present?
          uri = URI.parse(product['image'])
          new_product.image.attach(io: uri.open, filename: "#{new_product.id}.jpg")
        end
      end
      @post.products << product
    end
  end

  # 商品削除処理
  def delete_products(products, product_urls)
    # 削除された商品を取得
    remove_product_urls = product_urls - products.map { |product| product['productUrl'] }
    remove_products = Product.includes(:posts).where(product_url: remove_product_urls)

    remove_products.each do |product|
      if product.posts.size == 1
        product.destroy!
      else
        # 他の投稿で使われている場合、関連だけ削除
        @post.products.delete(product)
      end
    end
  end

  def set_post
    @post = @current_user.posts.find(params[:id])
  end

  def post_params
    params.permit(:content, :image, :category_id)
  end

  def product_params
    params.permit(:products)
  end
end
