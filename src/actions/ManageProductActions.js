import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PRODUCT_REMOVED,
  EDIT_PRODUCT_NAME_CHANGED,
  EDIT_PRODUCT_PRICE_CHANGED,
  EDIT_PRODUCT_DESCRIPTION_CHANGED,
  EDIT_PRODUCT_IMAGE_CHANGED,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  SETUP_EDIT_SCREEN
} from './types';

export const setupEditScreen = (product) => {
  const { productName, productPrice, productDescription, productImage, _key } = product;
  return {
    type: SETUP_EDIT_SCREEN,
    payload: { productName, productPrice, productDescription, productImage, _key }
  };
};

export const editProductNameChanged = (text) => {
  return {
    type: EDIT_PRODUCT_NAME_CHANGED,
    payload: text
  };
};

export const editProductPriceChanged = (text) => {
  return {
    type: EDIT_PRODUCT_PRICE_CHANGED,
    payload: text
  };
};

export const editProductDescriptionChanged = (text) => {
  return {
    type: EDIT_PRODUCT_DESCRIPTION_CHANGED,
    payload: text
  };
};

export const editProductImageChanged = (text) => {
  return {
    type: EDIT_PRODUCT_IMAGE_CHANGED,
    payload: text
  };
};

export const editProduct = ({ eProductName, eProductPrice, eProductDescription, eProductImage, user, userName, pid }) => {
  console.log('Name = '+eProductName+'\nprice = '+eProductPrice+'\ndes = '+eProductDescription+'\nuid = '+user.uid+'\npid = '+pid);
  return (dispatch) => {
    let { FBN, FBP, FBD, FBI } = '';
    let { e1, e2, e3, e4 } = false;

    var re = /^[a-zA-Z0-9 ]{3,}$/;
    if (!re.test(eProductName)) {
      if (eProductName === '') { FBN = 'Product name shouldn\'t be empty'; }
      else { FBN = 'Product name should be 3 Alphanumeric or more'; }
      e1 = true;
    }

    re = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
    if (!re.test(eProductPrice)) {
      if (eProductPrice === '') { FBP = 'Product price shouldn\'t be empty'; }
      else { FBP = 'Product price should be numeric'; }
      e2 = true;
    }

    re = /^[a-zA-Z0-9_ !@#$%^&*()-+.]{10,}$/;
    if (!re.test(eProductDescription)) {
      if (eProductDescription === '') { FBD = 'Poduct description shouldn\'t be empty'; }
      else { FBD = 'Product description should be 10 characters or more'; }
      e3 = true;
    }

    if (eProductImage === null) { FBI = 'You have to select an image'; e4 = true; }

    if (e1 || e2 || e3 || e4) {
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload: { FBN, FBP, FBD, FBI }
      });
    } else {
      console.log('uid = ' + user.uid + '\npid = ' + pid);
      firebase.database().ref(`/Product/${user.uid}/${pid}`)
      .set({
        ProductName: eProductName,
        ProductPrice: eProductPrice,
        ProductDescription: eProductDescription,
        ProductImage: eProductImage,
        ProviderName: userName
       })
        .then(() => {
          dispatch({
            type: EDIT_PRODUCT_SUCCESS,
            payload: 'Product was successfully edited'
          });
          Actions.providerHome();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    };
  };

export const removeProduct = ({ uid, pid }) => {
  console.log('uid = ' + uid + '\npid = ' + pid);
  return (dispatch) => {
    firebase.database().ref(`/Product/${uid}/${pid}`).remove()
    .then(() => {
      console.log('Product removed successfully');
      dispatch({
        type: PRODUCT_REMOVED,
        payload: 'Product removed successfully'
      });
      Actions.providerHome();
    })
    .catch((error) => {
      console.log(error);
    });
  };
};
