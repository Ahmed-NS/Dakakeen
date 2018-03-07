import {
  GET_PROVIDER_PRODUCTS,
  ADD_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  pProducts: [],
  productFeedback: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROVIDER_PRODUCTS:
      return { ...state, pProducts: action.payload, productFeedback: '' };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, productFeedback: action.payload };
    case EDIT_PRODUCT_SUCCESS:
      return { ...state, productFeedback: action.payload };
    case LOGOUT:
    console.log('SSSSS');
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
