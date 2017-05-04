Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'application#home'

  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :gigs
      end
    end
  end
end
