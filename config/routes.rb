Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_scope :user do
    root to: "devise/sessions#new"
  end

  resources :users, only: [:show]
  resources :gig_requests, only: [:index, :show, :update, :destroy] do
    resources :auditions
  end
  resources :gigs, only: [:index]


  namespace :api do
    namespace :v1 do
      resources :users do
        resources :gigs
        resources :user_tracks, only: [:create, :destroy]
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
      resources :gig_requests do
        resources :auditions
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :gigs
        resources :gigs, only: [:index]
      end
    end


end
