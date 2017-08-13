// 处理错误的中间件
import {
  LOGIN, LOGOUT
 } from '../constants';
import notificationUtils from '../helpers/notificationUtils.js';
export const errorReporter = store => next => action => {
  if(Object.prototype.toString.call(action.data) === '[object Error]') {
    switch (action.type) {
      case LOGIN:
        notificationUtils.notificationError(action.data.message, `登录失败`, 3);
        break;
      case LOGOUT:
        notificationUtils.notificationError(action.data.message, '退出失败', 3);
        break;
      default:
        return null;
    }
  } else {
    // let isStatusCodeTrue = action && action.data && action.data.code;
    // if(isStatusCodeTrue && isStatusCodeTrue !== 1) { // 不存在code（plain object） 或者存在code（网络请求）但是code！==1；
    //   throw new Error('出现了错误！');
    // }
    return next(action);
  }
}
