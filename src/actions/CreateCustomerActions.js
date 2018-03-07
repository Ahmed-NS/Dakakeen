import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CUSTOMER_NAME_CHANGED,
  CUSTOMER_EMAIL_CHANGED,
  CUSTOMER_ADDRESS_CHANGED,
  CUSTOMER_PASSWORD_CHANGED,
  CUSTOMER_CONFIRM_PASSWORD_CHANGED,
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_FAIL,
  CREATE_CUSTOMER_SUCCESS,
  EMAIL_USED
} from './types';

export const customerNameChanged = (text) => {
  return {
    type: CUSTOMER_NAME_CHANGED,
    payload: text
  };
};

export const customerEmailChanged = (text) => {
  return {
    type: CUSTOMER_EMAIL_CHANGED,
    payload: text
  };
};

export const customerAddressChanged = (text) => {
  return {
    type: CUSTOMER_ADDRESS_CHANGED,
    payload: text
  };
};

export const customerPasswordChanged = (text) => {
  return {
    type: CUSTOMER_PASSWORD_CHANGED,
    payload: text
  };
};

export const customerConfirmPasswordChanged = (text) => {
  return {
    type: CUSTOMER_CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const createCustomer = ({ cName, cEmail, cAddress, cPassword, cConfirmPassword }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_CUSTOMER });

    let { FBN, FBE, FBA, FBP, FBC } = '';
    let { e1, e2, e3, e4, e5 } = false;

    var re = /^[a-zA-Z0-9_ ]{3,}$/;
    if (!re.test(cName)) {
      if (cName === '') { FBN = 'Name shouldn\'t be empty'; }
      else { FBN = 'Name should be 3 Alphanumeric or more'; }
      e1 = true;
    }
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(cEmail)) {
    if (cEmail === '') { FBE = 'Email shouldn\'t be empty'; }
    else { FBE = 'Email doesn\'t match the pattern (Smith@example.com)'; }
    e2 = true;
  }

  re = /^[a-zA-Z0-9_ !@#$%^&*()-+.]{10,}$/;
  if (!re.test(cAddress)) {
    if (cAddress === '') { FBA = 'Address shouldn\'t be empty'; }
    else { FBA = 'Address should be 10 Alphanumeric or more'; }
    e3 = true;
  }

  re = /^\w{8,16}$/;
  if (!re.test(cPassword)) {
    if (cPassword === '') { FBP = 'Password shouldn\'t be empty'; }
    else { FBP = 'Password should be 8-16 Alphanumeric or more'; }
    e4 = true;
  }

    if (cConfirmPassword !== cPassword) { FBC = 'Doesn\'t match your Password'; e5 = true; }

    if (e1 || e2 || e3 || e4 || e5) {
      dispatch({
        type: CREATE_CUSTOMER_FAIL,
        payload: { FBN, FBE, FBA, FBP, FBC }
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(cEmail, cPassword)
      .then(user => {
        firebase.database().ref(`/Account/${user.uid}`)
        .set({ Email: cEmail, Type: 'C' })
        .then(() => {
          firebase.database().ref(`/Customer/${user.uid}`)
          .set({ Email: cEmail, Name: cName, Address: cAddress })
          .then(() => {
            console.log('ccc');
            dispatch({
              type: CREATE_CUSTOMER_SUCCESS,
              payload: user
            });
            Actions.auth();
          });
        });
      })
      .catch(() => {
        console.log('Fail');
        dispatch({
          type: EMAIL_USED,
          payload: 'Email already used'
        });
      });
    }
  };
};
