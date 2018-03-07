import firebase from 'firebase';
import {
  GET_PROVIDER_PRODUCTS
} from './types';

export const getPProducts = (user) => {
  return (dispatch) => {
  firebase.database().ref(`/Product/${user.uid}`).once('value').then((snapshot) => {
    var ar = [];
    snapshot.forEach((child) => {
      ar.push({
        productName: child.val().ProductName,
        productPrice: child.val().ProductPrice,
        productDescription: child.val().ProductDescription,
        productImage: child.val().ProductImage,
        _key: child.key
      });
    });
    dispatch({
      type: GET_PROVIDER_PRODUCTS,
      payload: ar
    });
  });
};
};
