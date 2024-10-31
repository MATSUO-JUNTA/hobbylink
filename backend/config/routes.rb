Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/:provider/callback", to: "users#create"
      get "api_check", to: "api_check#index"
    end
  end
end
