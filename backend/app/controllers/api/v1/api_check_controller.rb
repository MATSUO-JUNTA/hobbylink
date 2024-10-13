class Api::V1::ApiCheckController < ApplicationController
  def index
    render json: { message: "Success" }, status: :ok
  end
end
