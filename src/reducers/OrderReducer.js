import {
  CREATE_ORDER,
  GET_PROVIDER_ORDERS,
  LOGOUT,
  GET_CUSTOMER_ORDERS,
  ORDER_ACCEPTED,
  ORDER_DENIED,
  ORDER_OUT_STOCK,
  GET_PRODUCTS,
  UPDATE_RATE,
  NEW_RATE
} from '../actions/types';

const INITIAL_STATE = {
  createOrderFB: '',
  providerOrders: [],
  customerOrders: [],
  providerOrdersFB: '',
  ratings: [],
  rateFB: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, createOrderFB: '' };
    case CREATE_ORDER:
      return { ...state, createOrderFB: action.payload };
    case GET_PROVIDER_ORDERS:
      return { ...state, providerOrders: action.payload, providerOrdersFB: '' };
    case GET_CUSTOMER_ORDERS:
      return { ...state, customerOrders: action.payload.ar, ratings: action.payload.rAr, rateFB: '' };
    case ORDER_ACCEPTED:
      return { ...state, providerOrdersFB: action.payload };
    case ORDER_DENIED:
      return { ...state, providerOrdersFB: action.payload };
    case ORDER_OUT_STOCK:
      return { ...state, providerOrdersFB: action.payload };
    case UPDATE_RATE:
      return { ...state, ratings: action.payload };
    case NEW_RATE:
      return { ...state, rateFB: action.payload };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
