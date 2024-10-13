Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "api_check", to: "api_check#index"
    end
  end
end
