import axios from 'axios';
import { LOGIN, LOGOUT } from './types';
import { SERVER_IP } from '../../private';

const finishLogin = (email, token) => {
  return {
    type: LOGIN,
    payload: {
      email,
      token,
    },
  };
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const data = await axios.post(`${SERVER_IP}/api/login`, {
      email,
      password,
    });
    return dispatch(finishLogin(data.email, data.token));
  } catch (error) {
    alert(error, 'Please check your email and password');
  }
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};
