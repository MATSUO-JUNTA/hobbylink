class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.all
    serializer = params[:include_image] == 'true' ? CategorySerializer : PostCategorySerializer
    render json: categories, each_serializer: serializer, status: :ok
  end
end
