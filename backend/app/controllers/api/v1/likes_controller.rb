class Api::V1::LikesController < ApplicationController
  before_action :authenticate, only: [:create, :destroy]
  before_action :set_post, only: [:create, :destroy]

  def create
    @post.users << @current_user
    render json: @post.likes.count, status: :created
  end

  def destroy
    @post.users.delete(@current_user)
    render json: @post.likes.count, status: :ok
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end
