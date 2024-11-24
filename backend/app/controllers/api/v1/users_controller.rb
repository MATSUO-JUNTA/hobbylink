require 'open-uri'

class Api::V1::UsersController < ApplicationController
  before_action :authenticate, only: [:update]

  def show
    user = User.find(params[:id])
    render json: user, serializer: ShowUserSerializer, status: :ok
  end

  def create
    user = User.find_or_create_by(email: user_params[:email], provider: user_params[:provider]) do |new_user|
      new_user.name = user_params[:name]
      uri = URI.parse(user_params[:image])
      new_user.image.attach(io: uri.open, filename: "#{new_user.id}.jpg")
    end

    if user
      token = encode_token({ user_id: user.id })
      render json: user, serializer: UserSerializer, token:, status: :ok
    else
      render json: { error: 'ログインに失敗しました' }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.update(user_params)
      head :ok
    else
      render json: { error: 'プロフィール編集に失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :image, :provider, :bio)
  end

  def encode_token(payload)
    JWT.encode(payload, Settings.jwt_secret_key)
  end
end
