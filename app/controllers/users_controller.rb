class UsersController < ApplicationController
  before_action :require_login
  before_action :authorize_admin, except: [:show]

  def index
    @users = User.where("role = 'member'").order(first_name: :asc)
  end

  def show
    @user = User.find(params[:id])
    @user_instruments = @user.instruments.pluck(:name)
    @user_genres = @user.genres.pluck(:name)
    user_gigs = @user.gigs.order(event_date: :desc)
    @user_gigs = []
    unless user_gigs.empty?
      user_gigs.each do |gig|
        @user_gigs << {
                        data: gig,
                        genres: gig.genres.pluck(:name)
        }
      end
    end

    @user_gig_requests = @user.gig_requests
    @user_tracks = @user.user_tracks
    @all_genres = Genre.all.order(name: :asc).pluck(:name)
    @all_instruments = Instrument.all.order(name: :asc).pluck(:name)
    @valid_user = validate_user(@user)
  end

  def authorize_admin
  if !user_signed_in?
    raise ActionController::RoutingError.new("Not Found")
  elsif !current_user.is_admin?
    raise ActionController::RoutingError.new("Not Found")
  end
end

end
