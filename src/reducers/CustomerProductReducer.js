import {
  GET_PRODUCTS,
  QTY_CHANGED,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  products: [],
  qtyList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload.ar, qtyList: action.payload.qr };
    case QTY_CHANGED:
      return { ...state, qtyList: action.payload };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
