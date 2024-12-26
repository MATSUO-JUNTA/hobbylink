class Api::V1::CommentsController < ApplicationController
  before_action :authenticate, only: [:create, :update, :destroy]
  before_action :set_comment, only: [:update, :destroy]

  def index
    comments = Post.includes(comments: :user).find(params[:post_id]).comments.order(:created_at)
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

  def update
    if @comment.update(comment_params)
      head :ok
    else
      render json: { error: 'コメントの更新に失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy
    if @comment.destroy
      head :ok
    else
      render json: { error: 'コメントの削除に失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.permit(:content)
  end
end
