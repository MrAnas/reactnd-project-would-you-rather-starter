import { combineReducers } from 'redux';
import { login } from '../redux/reducers/loginReducers';
import { users } from '../redux/reducers/usersReducers';
import { questions } from '../redux/reducers/questionsReducers';

export default combineReducers({
  login,
  users,
  questions,
});
