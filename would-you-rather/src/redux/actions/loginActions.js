// sync actions for login
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'

export function receiveLogin(userId) {
  return {
    type: RECEIVE_LOGIN,
    isLoggedin: true,
    loggedInId: userId
  }
}

export function receiveLogout() {
  return {
    type: RECEIVE_LOGOUT,
    isLoggedin: false,
    loggedInId: null
  }
}
