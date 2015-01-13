class TasksController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!
  
  def index
  end
end
