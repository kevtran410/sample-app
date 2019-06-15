import { combineReducers } from 'redux';
import auth from './InitialReducer';

import { Constant } from '../common';

const { USER_LOGOUT } = Constant.login;

const rootReducer = combineReducers({
  auth
});

export default (state, action) =>
  action.type === USER_LOGOUT
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
