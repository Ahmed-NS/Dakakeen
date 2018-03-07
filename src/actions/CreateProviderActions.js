import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PROVIDER_NAME_CHANGED,
  PROVIDER_EMAIL_CHANGED,
  PROVIDER_ADDRESS_CHANGED,
  PROVIDER_PASSWORD_CHANGED,
  PROVIDER_CONFIRM_PASSWORD_CHANGED,
  CREATE_PROVIDER,
  CREATE_PROVIDER_FAIL,
  CREATE_PROVIDER_SUCCESS,
  EMAIL_USED,
  PROVIDER_NATIONALID_CHANGED,
  PROVIDER_PHONE_CHANGED
} from './types';

export const providerNameChanged = (text) => {
  return {
    type: PROVIDER_NAME_CHANGED,
    payload: text
  };
};

export const providerEmailChanged = (text) => {
  return {
    type: PROVIDER_EMAIL_CHANGED,
    payload: text
  };
};

export const providerNationalIDChanged = (text) => {
  return {
    type: PROVIDER_NATIONALID_CHANGED,
    payload: text
  };
};

export const providerPhoneChanged = (text) => {
  return {
    type: PROVIDER_PHONE_CHANGED,
    payload: text
  };
};

export const providerAddressChanged = (text) => {
  return {
    type: PROVIDER_ADDRESS_CHANGED,
    payload: text
  };
};

export const providerPasswordChanged = (text) => {
  return {
    type: PROVIDER_PASSWORD_CHANGED,
    payload: text
  };
};

export const providerConfirmPasswordChanged = (text) => {
  return {
    type: PROVIDER_CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const createProvider = ({ pName, pEmail, pNationalID, pPhone, pAddress, pPassword, pConfirmPassword }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_PROVIDER });

    let { FBN, FBE, FBNI, FBPH, FBA, FBP, FBC, } = '';
    let { e1, e2, e3, e4, e5, e6, e7 } = false;

    var re = /^[a-zA-Z0-9_ ]{3,}$/;
    if (!re.test(pName)) {
      if (pName === '') { FBN = 'Name shouldn\'t be empty'; }
      else { FBN = 'Name should be 3 Alphanumeric or more'; }
      e1 = true;
    }

    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(pEmail)) {
    if (pEmail === '') { FBE = 'Email shouldn\'t be empty'; }
    else { FBE = 'Email doesn\'t match the pattern (Smith@example.com)'; }
    e2 = true;
  }

    re = /^\d{10}$/;
    if (!re.test(pNationalID)) {
      if (pNationalID === '') { FBNI = 'National ID shouldn\'t be empty'; }
      else { FBNI = 'National ID should be 10 numbers'; }
      e3 = true;
    }

    re = /^\d{10}$/;
    if (!re.test(pPhone)) {
      if (pPhone === '') { FBPH = 'Phone number shouldn\'t be empty'; }
      else { FBPH = 'Phone number should be 10 numbers'; }
      e4 = true;
    }

    re = /^[a-zA-Z0-9_ !@#$%^&*()-+.]{10,}$/;
    if (!re.test(pAddress)) {
      if (pAddress === '') { FBA = 'Address shouldn\'t be empty'; }
      else { FBA = 'Address should be 10 Alphanumeric or more'; }
      e5 = true;
    }

    re = /^\w{8,16}$/;
    if (!re.test(pPassword)) {
      if (pPassword === '') { FBP = 'Password shouldn\'t be empty'; }
      else { FBP = 'Password should be 8-16 Alphanumeric or more'; }
      e6 = true;
    }

      if (pConfirmPassword !== pPassword) { FBC = 'Doesn\'t match your Password'; e7 = true; }

    if (e1 || e2 || e3 || e4 || e5 || e6 || e7) {
      dispatch({
        type: CREATE_PROVIDER_FAIL,
        payload: { FBN, FBE, FBNI, FBPH, FBA, FBP, FBC }
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(pEmail, pPassword)
        .then(user => {
          firebase.database().ref(`/Account/${user.uid}`)
            .set({ Email: pEmail, Type: 'P' })
            .then(() => {
              firebase.database().ref(`/Provider/${user.uid}`)
                .set({ Email: pEmail, Name: pName, Address: pAddress, NationalID: pNationalID, Phone: pPhone })
                .then(() => {
                  console.log('ppp');
                  dispatch({
                    type: CREATE_PROVIDER_SUCCESS,
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
