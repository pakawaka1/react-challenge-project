import axios from 'axios';
import {
  FETCH_ORDERS,
  NEW_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  ORDER_FORM,
} from './types';
import { SERVER_IP } from '../../private';

const URL = `${SERVER_IP}/api/`;

export const fetchOrders = () => async (dispatch) => {
  try {
    const data = await axios.get(`${URL}/current-orders`);
    return dispatch({ type: FETCH_ORDERS, payload: data.data });
  } catch (error) {
    alert(error, 'There was an error adding your order');
  }
};

export const editOrder = (orderData) => async (dispatch) => {
  try {
    const data = await axios.post(`${URL}/current-orders`, {
      orderData,
    });
    return dispatch({ type: EDIT_ORDER, payload: data.data });
  } catch (error) {
    alert(error, 'Error submitting your order');
  }
};

export const deleteOrder = (orderData) => async (dispatch) => {
  try {
    const data = await axios.post(`${URL}/current-orders`, {
      id: orderData,
    });
    return dispatch({ type: DELETE_ORDER, payload: data.data });
  } catch (error) {
    alert(error, 'Error deleting your order');
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const data = await axios.post(`${URL}/current-orders`, {
      order_item: orderData.order_item,
      quantity: orderData.quantity,
      ordered_by: this.props.auth.email || 'Unknown!',
    });
    return dispatch({ type: NEW_ORDER, payload: data.data });
  } catch (error) {
    alert(error, 'Error submitting your order');
  }
};

export const updateOrderForm = (orderData) => {
  return {
    type: ORDER_FORM,
    payload: orderData,
  };
};
