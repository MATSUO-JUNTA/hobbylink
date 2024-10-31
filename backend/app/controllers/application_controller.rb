class ApplicationController < ActionController::API
  def authenticate
    auth_token = request.headers['auth-token']
    if auth_token
      begin
        decoded_token = JWT.decode(auth_token, Settings.jwt_secret_key)
        @current_user = User.find(decoded_token[0]['user_id'])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render status: :unauthorized
      end

    else
      render status: :unauthorized
    end
  end
end
