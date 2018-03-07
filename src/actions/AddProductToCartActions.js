import firebase from 'firebase';
import {
  ADD_PRODUCT_TO_CART_SUCCESS
} from './types';


export const addProductToCart = ({
  uid,
  providerId,
  productId,
  productName,
  providerName,
  productDescription,
  productPrice,
  productImage,
  qty
}) => {
  return (dispatch) => {
    firebase.database().ref(`/Cart/${uid}/${productId}`).once('value').then((snapshot) => {
      firebase.database().ref(`/Cart/${uid}/${productId}`)
      .set({
        ...snapshot.val(),
        Qty: snapshot.val().Qty + qty
      })
      .then(() => {
        dispatch({
          type: ADD_PRODUCT_TO_CART_SUCCESS,
          payload: 'Product added to cart successfully'
        });
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((e) => {
      console.log('not updated e = ' + e);
      firebase.database().ref(`/Cart/${uid}/${productId}`)
      .set({
        ProductName: productName,
        ProductPrice: productPrice,
        ProductDescription: productDescription,
        ProviderName: providerName,
        ProductImage: productImage,
        ProviderId: providerId,
        ProductId: productId,
        Qty: qty
      })
      .then(() => {
        console.log(`${productName} added successfully`);
        dispatch({
          type: ADD_PRODUCT_TO_CART_SUCCESS,
          payload: 'Product added to cart successfully'
        });
      })
      .catch((error) => {
        console.log(error);
      });
    });
  };
};
