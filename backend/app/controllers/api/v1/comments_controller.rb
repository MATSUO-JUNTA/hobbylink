class Api::V1::CommentsController < ApplicationController
  before_action :authenticate, only: [:create]

  def index
    comments = Post.includes(comments: :user).find(params[:post_id]).comments
    render json: comments
  end

  def create
    post = Post.find(params[:post_id])
    comment = post.comments.new(comment_params)
    comment.user = @current_user
    if comment.save
      head :ok
    else
      render json: { error: 'コメントに失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.permit(:content)
  end
end
