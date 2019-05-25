import { 
  RECEIVE_LOGIN, 
  RECEIVE_LOGOUT } from '../actions/loginActions';

const initStateLogin = {
  isLoggedin: false,
  loginId: null,
}

export function login(state = initStateLogin, action) {
  switch(action.type) {
    case RECEIVE_LOGIN:
      return {
        ...state,
        isLoggedin: action.isLoggedin,
        loginId: action.loginId,
      }
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isLoggedin: action.isLoggedin,
        loginId: action.loginId,
      }
    default:
      return state
  }
}
