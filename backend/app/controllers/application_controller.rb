class ApplicationController < ActionController::API
  def authenticate
    @current_user = decoded_token
    return if @current_user

    render status: :unauthorized
  end

  def current_user
    @current_user = decoded_token
  end

  private

  def decoded_token
    auth_token = request.headers['auth-token']
    return nil unless auth_token

    begin
      decoded_token = JWT.decode(auth_token, Settings.jwt_secret_key)
      User.find(decoded_token[0]['user_id'])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      nil
    end
  end
end
