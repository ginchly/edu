class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def new
  end

  def index
  	 @users = User.order('points DESC').all
  end

  def update_points
  	updated_user = current_user
  	updated_user.points = updated_user.points + Integer(params[:additional_points])
  	updated_user.save

  	redirect_to users_url
  end
end