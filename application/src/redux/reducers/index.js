import { combineReducers } from 'redux';
import tempReducer from './tempReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  temp: tempReducer,
  auth: authReducer,
  order: orderReducer,
});
