import firebase from 'firebase';
import {
  GET_PRODUCTS,
  QTY_CHANGED
} from './types';

export const getProducts = () => {
  return (dispatch) => {
    firebase.database().ref('/Product').once('value').then((snapshot) => {
      var ar = [];
      for (var propName in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(propName)) {
          var propValue = snapshot.val()[propName];
          for (var propName2 in propValue) {
            if (propValue.hasOwnProperty(propName2)) {
              var propValue2 = propValue[propName2];
              ar.push({
                productName: propValue2.ProductName,
                productPrice: propValue2.ProductPrice,
                productDescription: propValue2.ProductDescription,
                providerName: propValue2.ProviderName,
                productImage: propValue2.ProductImage,
                productId: propName2,
                providerId: propName,
                _key: propValue2.key
              });
            }
          }
        }
      }
      firebase.database().ref('/Provider').once('value').then((data) => {
        ar.map((value, i) => {
          ar[i] = { ...ar[i], rate: data.val()[value.providerId].Rate, numOfRatings: data.val()[value.providerId].numberOfRatings };
        });
        console.log('new ar ===> %O', ar);

        var qr = {};
        for (var i = 0; i < ar.length; i++)
          qr[ar[i].productId] = 1;
        dispatch({
          type: GET_PRODUCTS,
          payload: { ar, qr }
        });
      })
      .catch((e) => {
        console.log(e);
      });
    })
    .catch((e) => {
      console.log(e);
    });
  };
};

export const qtychanged = ({ qlist, pid, value }) => {
  console.log('product id = ' + pid + '\n old qty = ' + qlist[pid]);
  qlist[pid] = value;
  console.log('new qty = ' + qlist[pid]);
  return {
    type: QTY_CHANGED,
    payload: qlist
  };
};
