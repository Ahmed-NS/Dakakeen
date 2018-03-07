import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CREATE_ORDER,
  CREATE_ORDER_FAILED
} from './types';

export const createOrder = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Cart/${uid}`).once('value').then((snapshot) => {
      console.log('snapshot.val() => ' + snapshot.val());
      if (snapshot.val() === null) {
        ceateOrderFailed(dispatch);
        return;
      }
      var date = Date.now();
      var ar = [];
      var qtyAr = [];
      var totalPriceAr = [];
      for (var prop in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(prop)) {
          var Value = snapshot.val()[prop];
          ar[Value.ProviderId] = [];
          qtyAr[Value.ProviderId] = 0;
          totalPriceAr[Value.ProviderId] = 0;
        }
      }
      for (var propName in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(propName)) {
          var propValue = snapshot.val()[propName];
          ar[propValue.ProviderId].push({
            productName: propValue.ProductName,
            productPrice: propValue.ProductPrice,
            productId: propValue.ProductId,
            qty: propValue.Qty
          });
          qtyAr[propValue.ProviderId] += propValue.Qty;
          totalPriceAr[propValue.ProviderId] += propValue.Qty * propValue.ProductPrice;
        }
      }
      firebase.database().ref(`/Customer/${uid}`).once('value').then((snapshot2) => {
        for (var value in ar) {
          console.log('ar[value] >>> %O', ar[value]);
          firebase.database().ref(`/Order/${uid}`)
          .push({
            CustomerId: uid,
            CustomerName: snapshot2.val().Name,
            CustomerAddress: snapshot2.val().Address,
            Products: ar[value],
            NumberOfProducts: qtyAr[value],
            TotalPrice: totalPriceAr[value],
            date,
            Status: 'Waiting for response',
            ProviderId: value,
            Rate: 0
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: CREATE_ORDER_FAILED,
              payload: 'Creating order failed'
            });
            return;
          });
        }
        firebase.database().ref(`/Cart/${uid}`).remove()
        .then(() => {
          console.log('Order created successfully');
          dispatch({
            type: CREATE_ORDER,
            payload: 'Order created successfully'
          });
          Actions.customerHome();
        })
        .catch((error) => {
          console.log(error);
        });
      });
    });
  };
};

const ceateOrderFailed = (dispatch) => {
  dispatch({
    type: CREATE_ORDER_FAILED,
    payload: 'Create order failed (cart is empty)'
  });
};
