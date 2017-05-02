class Api::V1::UsersController < ApplicationController

  def index
    @user = User.all
  end
end
