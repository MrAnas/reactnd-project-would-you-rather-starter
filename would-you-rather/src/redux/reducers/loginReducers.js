import { RECEIVE_LOGIN, RECEIVE_LOGOUT } from '../actions/loginActions';

const initStateLogin = {
  isLoggedin: false,
  loggedInId: null,
}

export function login(state = initStateLogin, action) {
  switch(action.type) {
    case RECEIVE_LOGIN:
      return {
        ...state,
        isLoggedin: action.isLoggedin,
        loggedInId: action.loggedInId,
      }
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isLoggedin: action.isLoggedin,
        loggedInId: action.loggedInId,
      }
    default:
      return state
  }
}
