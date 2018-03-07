import {
  ADD_PRODUCT_TO_CART_SUCCESS,
  GET_CART_PRODUCTS,
  CREATE_ORDER,
  CREATE_ORDER_FAILED,
  GET_PRODUCTS,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  addToCartFB: '',
  cartProducts: [],
  totalPrice: '',
  cartFB: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART_SUCCESS:
      return { ...state, addToCartFB: action.payload, cartFB: '' };
    case GET_CART_PRODUCTS:
      return { ...state, cartProducts: action.payload.ar, totalPrice: action.payload.totalPrice, addToCartFB: '' };
    case CREATE_ORDER:
      return { ...state, ...INITIAL_STATE };
    case CREATE_ORDER_FAILED:
    console.log('failed payload = ' + action.payload);
      return { ...state, cartFB: action.payload };
    case GET_PRODUCTS:
      return { ...state, addToCartFB: '' };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
