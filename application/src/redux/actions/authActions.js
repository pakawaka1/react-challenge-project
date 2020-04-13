import { LOGIN, LOGOUT } from './types';
import { SERVER_IP } from '../../private';
import axios from 'axios';

const finishLogin = (email, token) => {
  return {
    type: LOGIN,
    payload: {
      email,
      token,
    },
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const data = await axios.post(`${SERVER_IP}/api/login`, {
        email,
        password,
      });
      dispatch(finishLogin(data.data.email, data.data.token));
    } catch (error) {
      alert(error, 'Error Logging In');
    }
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};
