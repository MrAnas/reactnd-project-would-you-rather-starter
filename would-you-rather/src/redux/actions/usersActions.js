import { _getUsers } from '../../_DATA';
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export function requestUsers() {
  return {
    type: REQUEST_USERS,
    isRetrieving: true
  }
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    isRetrieving: false,
    users
  }
}

export const fetchUsers = () => dispatch => {
  dispatch(requestUsers());
  return _getUsers()
          .then(data => dispatch(receiveUsers(data)));
}
