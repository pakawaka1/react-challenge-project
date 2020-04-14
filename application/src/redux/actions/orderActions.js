import axios from 'axios';
import { FETCH_ORDERS, EDIT_ORDER, DELETE_ORDER, ORDER_FORM } from './types';
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
    const data = await axios.post(`${URL}/edit-order`, {
      orderData,
    });
    return dispatch({ type: EDIT_ORDER, payload: data.data });
  } catch (error) {
    alert(error, 'Error submitting your order');
  }
};

export const deleteOrder = (orderData) => async (dispatch) => {
  try {
    const data = await axios.post(`${URL}/delete-order`, {
      id: orderData,
    });
    return dispatch({ type: DELETE_ORDER, payload: data.data });
  } catch (error) {
    alert(error, 'Error deleting your order');
  }
};

export const createOrder = (orderData) => async () => {
]  try {
    await axios.post(`${URL}/add-order`, {
      order_item: orderData.order_item,
      quantity: orderData.quantity,
      ordered_by: orderData.ordered_by,
    });
    alert('Thank you.  Your order has been submitted.');
  } catch (error) {
    alert(error, 'Error submitting your order');
  }
};

export const updateOrder = (order_item, quantity, ordered_by) => {
  return {
    type: ORDER_FORM,
    payload: {
      order_item,
      quantity,
      ordered_by,
    },
  };
};
