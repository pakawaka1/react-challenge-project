import {
  FETCH_ORDERS,
  EDIT_ORDER,
  DELETE_ORDER,
  ORDER_FORM,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {
    order_item: '',
    quantity: '',
    ordered_by: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        items: action.payload.orders,
      };
    case EDIT_ORDER:
      return {
        ...state,
        item: action.payload.order,
      };
    case DELETE_ORDER:
      return {
        ...state,
        item: action.payload.orders,
      };
    case ORDER_FORM:
      return {
        ...state,
        item: {
          order_item: action.payload.order_item,
          quantity: action.payload.quantity,
          ordered_by: action.payload.email,
        },
      };
    default:
      return state;
  }
};
