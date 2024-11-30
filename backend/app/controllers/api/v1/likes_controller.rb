class Api::V1::LikesController < ApplicationController
  before_action :authenticate, only: [:create, :destroy]

  def create
    post = Post.find(params[:post_id])
    post.users << @current_user
    render json: post.likes.count, status: :created
  end

  def destroy
    post = Post.find(params[:post_id])
    post.users.delete(@current_user)
    render json: post.likes.count, status: :ok
  end
end
