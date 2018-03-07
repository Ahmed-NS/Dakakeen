import {
  PRODUCT_NAME_CHANGED,
  PRODUCT_PRICE_CHANGED,
  PRODUCT_DESCRIPTION_CHANGED,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_IMAGE_CHANGED,
  ADD_PRODUCT_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  productName: '',
  productPrice: '',
  productDescription: '',
  productImage: null,
  FBProductName: '',
  FBProductPrice: '',
  FBProductImage: '',
  FBProductDescription: '',
  aLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_NAME_CHANGED:
      return { ...state, productName: action.payload };
    case PRODUCT_PRICE_CHANGED:
      return { ...state, productPrice: action.payload };
    case PRODUCT_DESCRIPTION_CHANGED:
      return { ...state, productDescription: action.payload };
    case PRODUCT_IMAGE_CHANGED:
      return { ...state, productImage: action.payload };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, ...INITIAL_STATE, productFeedback: action.payload };
    case ADD_PRODUCT_LOADING:
      return { ...state, aLoading: true };
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        FBProductName: action.payload.FBN,
        FBProductPrice: action.payload.FBP,
        FBProductDescription: action.payload.FBD,
        FBProductImage: action.payload.FBI,
        aLoading: false
      };
    default:
      return state;
  }
};
