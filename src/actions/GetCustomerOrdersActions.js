import firebase from 'firebase';
import {
  GET_CUSTOMER_ORDERS
} from './types';

export const getCustomerOrders = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref('/Order').once('value').then((snapshot) => {
      var ar = [];
      var date;
      for (var customerId in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(customerId)) {
          if (customerId === uid) {
            var orders = snapshot.val()[customerId];
            for (var order in orders) {
              if (orders.hasOwnProperty(order)) {
                var orderObj = orders[order];
                var oar = [];
                orderObj.Products.map((value) => {
                  date = new Date(orderObj.date);
                  date = (date.getDate() < 10 ? '0' : '') + date.getDate() + '/'
                  + (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1) + '/'
                  + date.getFullYear() + ' '
                  + (date.getHours() % 12 < 10 ? '0' : '') + (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12) + ':'
                  + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':'
                  + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() + ' '
                  + (date.getHours() > 11 ? 'PM' : 'AM');
                    oar.push({
                      productName: value.productName,
                      poductPrice: value.productPrice,
                      totalPrice: orderObj.TotalPrice,
                      qty: value.qty,
                      date,
                      status: orderObj.Status,
                      rate: orderObj.Rate,
                      oid: order,
                      pid: orderObj.ProviderId
                    });
                });
                if (typeof oar[0] !== 'undefined') {
                  ar.push(oar);
                }
              }
            }
          }
        }
      }
      ar.sort(function (a, b) {
        var dayA = parseInt(a[0].date.substring(0, 2), 10);
        var monthA = parseInt(a[0].date.substring(3, 5), 10);
        var yearA = parseInt(a[0].date.substring(6, 10), 10);
        var hoursA = parseInt(a[0].date.substring(11, 13), 10);
        var minutesA = parseInt(a[0].date.substring(14, 16), 10);
        var secondsA = parseInt(a[0].date.substring(17, 19), 10);
        hoursA += (a[0].date.substring(20, 22) === 'PM') ? 12 : 0;
        var dayB = parseInt(b[0].date.substring(0, 2), 10);
        var monthB = parseInt(b[0].date.substring(3, 5), 10);
        var yearB = parseInt(b[0].date.substring(6, 10), 10);
        var hoursB = parseInt(b[0].date.substring(11, 13), 10);
        var minutesB = parseInt(b[0].date.substring(14, 16), 10);
        var secondsB = parseInt(b[0].date.substring(17, 19), 10);
        hoursB += (b[0].date.substring(20, 22) === 'PM') ? 12 : 0;
        var adate = new Date(yearA, monthA, dayA, hoursA, minutesA, secondsA);
        var bdate = new Date(yearB, monthB, dayB, hoursB, minutesB, secondsB);

        return bdate.getTime() - adate.getTime();
      });

      var rAr = [];

      ar.map((value) => {
        rAr[value[0].oid] = value[0].rate;
      });

      dispatch({
        type: GET_CUSTOMER_ORDERS,
        payload: { ar, rAr }
      });
    });
  };
};
