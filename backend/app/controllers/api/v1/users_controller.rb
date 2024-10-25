require 'open-uri'

class Api::V1::UsersController < ApplicationController
  def create

    user = User.find_or_create_by(email: user_params[:email], provider: user_params[:provider]) do |user|
      user.name = user_params[:name]
      user.image.attach(io: URI.open(user_params[:image]), filename: "#{user.id}.jpg")
    end

    if user
      token = encode_token({ user_id: user.id })
      render json: {user: user, token: token}, status: :ok
    else
      render json: { error: "ログインに失敗しました" }, status: :unprocessable_entity
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



