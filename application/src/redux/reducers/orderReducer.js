import {
  FETCH_ORDERS,
  ADD_ORDER,
  NEW_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {},
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
        item: action.payload.order,
      };
    case NEW_ORDER:
      return {
        ...state,
        item: action.payload.order,
      };
    case EDIT_ORDER:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_ORDER:
      return {
        ...state,
        item: action.payload.orders,
      };
    default:
      return state;
  }
};
