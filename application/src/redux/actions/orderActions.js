import { FETCH_ORDERS, NEW_ORDER, EDIT_ORDER, DELETE_ORDER } from './types';
import { SERVER_IP } from '../../private';

export const fetchOrders = () => (dispatch) => {
  fetch(`${SERVER_IP}/api/current-orders`)
    .then((res) => res.json())
    .then((orders) =>
      dispatch({
        type: FETCH_ORDERS,
        payload: orders,
      })
    );
};

export const editOrder = (orderData) => (dispatch) => {
  fetch(`${SERVER_IP}/api/edit-order`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ orderData }),
  })
    .then((res) => res.json())
    .then((order) =>
      dispatch({
        type: EDIT_ORDER,
        payload: order,
      })
    )
    .then((res) => {
      if (res.success) {
        this.fetchOrders();
      } else {
        console.log('Error getting orders');
      }
    });
};

export const deleteOrder = (orderData) => (dispatch) => {
  fetch(`${SERVER_IP}/api/delete-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: orderData,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log('yolo');
        // const updatedOrders = this.state.orders.filter(
        //   (order) => order._id !== orderData
      } else {
        console.log('Error getting orders');
      }
    })
    .then((order) =>
      dispatch({
        type: DELETE_ORDER,
        payload: order,
      })
    );
};

export const createOrder = (orderData) => (dispatch) => {
  fetch(`${SERVER_IP}/api/add-order`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      order_item: orderData.order_item,
      quantity: orderData.quantity,
      ordered_by: this.props.auth.email || 'Unknown!',
    }),
  })
    .then((res) => res.json())
    .then((order) =>
      dispatch({
        type: NEW_ORDER,
        payload: order,
      })
    );
};
