import firebase from 'firebase';
import {
  GET_CART_PRODUCTS,
  ITEM_DELETED_FROM_CART
} from './types';

export const getCartProducts = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Cart/${uid}`).once('value').then((snapshot) => {
      var ar = [];
      var sum = 0;
      for (var propName in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(propName)) {
          var propValue = snapshot.val()[propName];
          sum += propValue.ProductPrice * propValue.Qty;
          ar.push({
            productName: propValue.ProductName,
            productPrice: propValue.ProductPrice,
            providerName: propValue.ProviderName,
            productImage: propValue.ProductImage,
            qty: propValue.Qty,
            pid: propValue.ProductId,
            _key: propValue.key
          });
        }
      }
      dispatch({
        type: GET_CART_PRODUCTS,
        payload: { ar, totalPrice: sum }
      });
    });
  };
};

export const deleteItem = ({ uid, pid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Cart/${uid}/${pid}`).remove()
    .then(() => {
      dispatch({
        type: ITEM_DELETED_FROM_CART
      });
    })
    .catch((e) => {
      console.log(e);
    });
  };
};
