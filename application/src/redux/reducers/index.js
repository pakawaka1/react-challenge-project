import { combineReducers } from 'redux';
import tempReducer from './tempReducer';
import authReducer from './authReducer';

export default combineReducers({
  temp: tempReducer,
  auth: authReducer,
});
