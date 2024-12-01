class Api::V1::RelationshipsController < ApplicationController
  before_action :authenticate, only: [:create, :destroy]
  before_action :set_user, only: [:create, :destroy]

  def create
    if @current_user.follow(@user)
      head :created
    else
      render json: { error: 'フォローに失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy
    if @current_user.unfollow(@user)
      head :ok
    else
      render json: { error: 'フォロー解除に失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end
end
