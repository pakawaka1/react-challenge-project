import {
  FETCH_ORDERS,
  EDIT_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {
    id: '',
    order_item: '',
    quantity: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        items: action.payload.orders,
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
    case EDIT_ORDER:
      return {
        ...state,
        item: {
          id: action.payload.id,
          order_item: action.payload.order_item,
          quantity: action.payload.quantity,
        },
      };
    case CLEAR_ORDER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
