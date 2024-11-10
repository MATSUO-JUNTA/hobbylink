class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories, each_serializer: PostCategorySerializer, status: :ok
  end
end
