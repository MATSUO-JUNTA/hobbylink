class Api::V1::NotificationsController < ApplicationController
  before_action :authenticate, only: [:index, :update]

  def index
    notifications = @current_user.notifications.includes(:notified_by)
    render json: notifications, status: :ok
  end

  def update
    notification = @current_user.notifications.find(params[:id])
    if notification.update(read: true)
      head :ok
    else
      render json: { error: '通知の更新に失敗しました' }, status: :unprocessable_entity
    end
  end
end
