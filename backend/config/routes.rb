# == Route Map
#

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/:provider/callback", to: "users#create"
      get "api_check", to: "api_check#index"
      resources :posts, only: [:create, :show, :edit, :update, :destroy] do
        collection do
          get "new_posts"
          get "search"
        end
      end
      resources :categories, only: [:index]
      resources :products, only: [:show] do
        collection do
          get "search"
        end
      end
    end
  end
end
