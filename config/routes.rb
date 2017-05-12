Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_scope :user do
      root to: "devise/sessions#new"
  end

  resources :users, only: [:show]
  resources :gig_requests, only: [:index, :show, :update, :destroy] do
    resources :auditions, only: [:new]
  end
  resources :gigs, only: [:index]


  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :update] do
        resources :gigs, only: [:index, :create, :update, :destroy]
        resources :user_tracks, only: [:create, :destroy]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :gig_requests, only: [:index, :show, :update, :destroy]  do
        resources :auditions, only: [:create, :destroy]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :gigs, only: [:index, :create, :update, :destroy]
      end
    end


end
