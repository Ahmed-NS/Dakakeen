import firebase from 'firebase';
import {
  GET_PROVIDER_ORDERS
} from './types';

export const getProviderOrders = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref('/Order').once('value').then((snapshot) => {
      var ar = [];
      var size = 0;
      var date;
      for (var customerId in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(customerId)) {
          var orders = snapshot.val()[customerId];
          for (var order in orders) {
            if (orders.hasOwnProperty(order)) {
              var orderObj = orders[order];
              if (orderObj.ProviderId === uid) {
                date = new Date(orderObj.date);
                date = (date.getDate() < 10 ? '0' : '') + date.getDate() + '/'
                + (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1) + '/'
                + date.getFullYear() + ' '
                + (date.getHours() % 12 < 10 ? '0' : '') + (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12) + ':'
                + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':'
                + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + ' '
                + (date.getHours() > 11 ? 'PM' : 'AM');
                ar.push({
                  customerName: orderObj.CustomerName,
                  customerAddress: orderObj.CustomerAddress,
                  customerId: orderObj.CustomerId,
                  date,
                  totalPrice: orderObj.TotalPrice,
                  status: orderObj.Status,
                  orderId: order,
                  products: []
                });
                orderObj.Products.map((value) => {
                  ar[size].products.push({
                    productName: value.productName,
                    poductPrice: value.productPrice,
                    qty: value.qty,
                  });
                });
                size++;
              }
            }
          }
        }
      }

      ar.sort(function (a, b) {
        var dayA = parseInt(a.date.substring(0, 2), 10);
        var monthA = parseInt(a.date.substring(3, 5), 10);
        var yearA = parseInt(a.date.substring(6, 10), 10);
        var hoursA = parseInt(a.date.substring(11, 13), 10);
        var minutesA = parseInt(a.date.substring(14, 16), 10);
        var secondsA = parseInt(a.date.substring(17, 19), 10);
        hoursA += (a.date.substring(20, 22) === 'PM') ? 12 : 0;
        var dayB = parseInt(b.date.substring(0, 2), 10);
        var monthB = parseInt(b.date.substring(3, 5), 10);
        var yearB = parseInt(b.date.substring(6, 10), 10);
        var hoursB = parseInt(b.date.substring(11, 13), 10);
        var minutesB = parseInt(b.date.substring(14, 16), 10);
        var secondsB = parseInt(b.date.substring(17, 19), 10);
        hoursB += (b.date.substring(20, 22) === 'PM') ? 12 : 0;
        var adate = new Date(yearA, monthA, dayA, hoursA, minutesA, secondsA);
        var bdate = new Date(yearB, monthB, dayB, hoursB, minutesB, secondsB);

        return bdate.getTime() - adate.getTime();
      });

        console.log('providerOrders(sorted) => %O', ar);

      dispatch({
        type: GET_PROVIDER_ORDERS,
        payload: ar
      });
    });
  };
};
