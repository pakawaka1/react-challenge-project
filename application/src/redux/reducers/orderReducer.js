import { FETCH_ORDERS, EDIT_ORDER, ADD_ORDER } from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {
    id: '',
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
        item: {
          id: action.payload.id,
          order_item: action.payload.order_item,
          quantity: action.payload.quantity,
        },
      };
    case ADD_ORDER:
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
