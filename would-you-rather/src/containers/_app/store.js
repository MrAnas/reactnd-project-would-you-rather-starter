import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { userReducer } from '../../redux/reducers/index';
import thunk from "redux-thunk";




const reducer = combineReducers({
    userReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,composeEnhancer(applyMiddleware(thunk)),);




export default store;
