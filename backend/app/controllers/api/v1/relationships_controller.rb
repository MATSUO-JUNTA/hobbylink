class Api::V1::RelationshipsController < ApplicationController
  before_action :authenticate, only: [:create, :destroy]
  before_action :set_user, only: [:create, :destroy, :following, :followers]

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

  def following
    following = @user.followings
    render json: following, each_serializer: RelationshipSerializer, status: :ok
  end

  def followers
    followers = @user.followers
    render json: followers, each_serializer: RelationshipSerializer, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
