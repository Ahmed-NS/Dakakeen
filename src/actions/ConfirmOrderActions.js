import firebase from 'firebase';
import {
  ORDER_ACCEPTED,
  ORDER_DENIED,
  ORDER_OUT_STOCK
} from './types';

export const acceptOrder = ({ oid, cid }) => {
  console.log('trying to accept order oid = ' + oid);
  return (dispatch) => {
    firebase.database().ref(`/Order/${cid}/${oid}`).once('value').then((snapshot) => {
      firebase.database().ref(`/Order/${cid}/${oid}`)
      .set({
        ...snapshot.val(),
        Status: 'Accepted'
      })
      .then(() => {
        dispatch({
          type: ORDER_ACCEPTED,
          payload: 'Order is accepted'
        });
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const denyOrder = ({ oid, cid }) => {
  console.log('trying to accept order oid = ' + oid);
  return (dispatch) => {
    firebase.database().ref(`/Order/${cid}/${oid}`).once('value').then((snapshot) => {
      firebase.database().ref(`/Order/${cid}/${oid}`)
      .set({
        ...snapshot.val(),
        Status: 'Denied'
      })
      .then(() => {
        dispatch({
          type: ORDER_DENIED,
          payload: 'Order is denied'
        });
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const outOfStock = ({ oid, cid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Order/${cid}/${oid}`).once('value').then((snapshot) => {
      firebase.database().ref(`/Order/${cid}/${oid}`)
      .set({
        ...snapshot.val(),
        Status: 'Out of Stock'
      })
      .then(() => {
        dispatch({
          type: ORDER_OUT_STOCK,
          payload: 'Order set to Out of Stock'
        });
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};
