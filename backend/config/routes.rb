# == Route Map
#

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/:provider/callback", to: "users#create"
      get "api_check", to: "api_check#index"
      resources :users, only: [:show, :update] do
        resource :relationships, only: [:create, :destroy]
        member do
          get "user_posts", to: "posts#user_posts"
          get "like_posts", to: "posts#like_posts"
        end
      end
      resources :posts, only: [:create, :show, :edit, :update, :destroy] do
        resource :likes, only: [:create, :destroy]
        resources :comments, only: [:index, :create]
        collection do
          get "new_posts"
          get "search"
          get "recommended_posts"
        end
      end
      resources :categories, only: [:index]
      resources :products, only: [:show] do
        collection do
          get "search"
        end
      end
      resources :notifications, only: [:index, :update]
    end
  end
end
