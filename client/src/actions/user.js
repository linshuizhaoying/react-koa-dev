import { USERLOGIN, USERLOGOUT } from '../constants/api';
import fetchUtils from '../helpers/fetchUtils';
import { LOGIN, LOGOUT } from '../constants';

const logout = (data) => ({
  type: LOGOUT,
  data: data,
})

const login = (data) => ({
  type: LOGIN,
  data: data,
})

export const loginUser = (infoOfLogin) => (dispatch, getState) => {
  fetchUtils.enhanceFetch(USERLOGIN, fetchUtils.options('POST', infoOfLogin))
  .then(json => {
    dispatch(login(json));
  })
  .catch(err => {
    dispatch(login(err));
  })
}
