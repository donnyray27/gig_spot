Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'application#home'

  resources :users, only: [:show]
  resources :gig_requests, only: [:index, :show, :destroy]
  resources :band_requests, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :gigs
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :genres
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :gig_requests
    end
  end

end
