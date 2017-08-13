import { notification } from 'antd';

export default class NotificationUtils {
  static notificationError = (message, description, duration) => {
    notification.error({
      message,
      description,
      duration: duration || 3
    });
  }

  static notificationSuccess = (message, description, duration) => {
    notification.success({
      message,
      description,
      duration: duration || 3
    })
  }
}
