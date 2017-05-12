class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?


  skip_before_filter :verify_authenticity_token

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :bio, :avatar, :zip_code])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :bio, :avatar, :zip_code, :remove_avatar])
  end

  def require_login
    if current_user.nil?
      flash[:notice] = "You must be logged in to access this section"
      redirect_to new_user_session_path
    end
  end


  def after_sign_in_path_for(resource)
  user_path(resource)
  end

  def validate_user(user)
     current_user == user
  end

end
