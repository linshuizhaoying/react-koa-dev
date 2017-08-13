import { LOGIN, LOGOUT } from '../constants';

const user = (state = {
  isLogin: false,
  account: '', //代表用户名，为了与后端保持一致
  userId: '', //代表用户id，
}, action) => {
  switch (action.type) {
    case LOGIN:
      if(action.data.code === 1) { // 成功为1，失败为0
        return {
          ...state,
          isLogin: true,
          userId: action.data.data.user.userId,
          account: action.data.data.user.account,
        }
      } else {
        return {
          ...state,
          isLogin: false,
          err: '登录失败',
        }
      }
    case LOGOUT: {
      return {
        ...state,
        isLogin: false,
        userId: "",
        account: ""
      }
    }
    default:
      return state;
  }
}

export default user;
