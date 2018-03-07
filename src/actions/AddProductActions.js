import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PRODUCT_NAME_CHANGED,
  PRODUCT_PRICE_CHANGED,
  PRODUCT_DESCRIPTION_CHANGED,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_IMAGE_CHANGED,
  ADD_PRODUCT_LOADING
} from './types';

export const productNameChanged = (text) => {
  return {
    type: PRODUCT_NAME_CHANGED,
    payload: text
  };
};

export const productPriceChanged = (text) => {
  return {
    type: PRODUCT_PRICE_CHANGED,
    payload: text
  };
};

export const productDescriptionChanged = (text) => {
  return {
    type: PRODUCT_DESCRIPTION_CHANGED,
    payload: text
  };
};

export const productImageChanged = (text) => {
  return {
    type: PRODUCT_IMAGE_CHANGED,
    payload: text
  };
};

export const addProduct = ({ productName, productPrice, productDescription, productImage, user, userName }) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_LOADING
    });
    let { FBN, FBP, FBD, FBI } = '';
    let { e1, e2, e3, e4 } = false;

    var re = /^[a-zA-Z0-9 ]{3,}$/;
    if (!re.test(productName)) {
      if (productName === '') { FBN = 'Product name shouldn\'t be empty'; }
      else { FBN = 'Product name should be 3 Alphanumeric or more'; }
      e1 = true;
    }

    re = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
    if (!re.test(productPrice)) {
      if (productPrice === '') { FBP = 'Product price shouldn\'t be empty'; }
      else { FBP = 'Product price should be numeric'; }
      e2 = true;
    }

    re = /^[a-zA-Z0-9_ !@#$%^&*()-+.]{10,}$/;
    if (!re.test(productDescription)) {
      if (productDescription === '') { FBD = 'Poduct description shouldn\'t be empty'; }
      else { FBD = 'Product description should be 10 characters or more'; }
      e3 = true;
    }

    if (productImage === null) { FBI = 'You have to select an image'; e4 = true; }

    if (e1 || e2 || e3 || e4) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: { FBN, FBP, FBD, FBI }
      });
    } else {
      firebase.database().ref(`/Product/${user.uid}`)
      .push({
        ProductName: productName,
        ProductPrice: productPrice,
        ProductDescription: productDescription,
        ProviderName: userName,
        ProductImage: productImage })
        .then(() => {
          dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: 'Product was successfully added'
          });
          Actions.providerHome();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    };
  };
