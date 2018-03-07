import {
  EDIT_PRODUCT_NAME_CHANGED,
  EDIT_PRODUCT_PRICE_CHANGED,
  EDIT_PRODUCT_DESCRIPTION_CHANGED,
  EDIT_PRODUCT_IMAGE_CHANGED,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  SETUP_EDIT_SCREEN,
  PRODUCT_REMOVED,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  productRemoveFB: '',
  eProductName: '',
  eProductPrice: '',
  eProductDescription: '',
  eProductImage: null,
  FBEProductName: '',
  FBEProductPrice: '',
  FBEProductImage: '',
  FBEProductDescription: '',
  eLoading: true,
  pid: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETUP_EDIT_SCREEN:
      return {
        ...state,
        eProductName: action.payload.productName,
        eProductPrice: action.payload.productPrice,
        eProductDescription: action.payload.productDescription,
        eProductImage: action.payload.productImage,
        pid: action.payload._key,
        eLoading: false
       };
    case EDIT_PRODUCT_NAME_CHANGED:
      return { ...state, eProductName: action.payload };
    case EDIT_PRODUCT_PRICE_CHANGED:
      return { ...state, eProductPrice: action.payload };
    case EDIT_PRODUCT_DESCRIPTION_CHANGED:
      return { ...state, eProductDescription: action.payload };
    case EDIT_PRODUCT_IMAGE_CHANGED:
      return { ...state, eProductImage: action.payload };
    case EDIT_PRODUCT_SUCCESS:
      return { ...state, ...INITIAL_STATE, productFeedback: action.payload };
    case EDIT_PRODUCT_FAIL:
      return {
        ...state,
        FBEProductName: action.payload.FBN,
        FBEProductPrice: action.payload.FBP,
        FBEProductDescription: action.payload.FBD,
        FBEProductImage: action.payload.FBI
      };
    case PRODUCT_REMOVED:
      return { ...state, productRemoveFB: action.payload };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
