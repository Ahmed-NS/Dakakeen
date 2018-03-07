import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => loginUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  firebase.database().ref(`/Account/${user.uid}`).once('value').then((snapshot) => {
    if (snapshot.val().Type === 'C') {
      firebase.database().ref(`/Customer/${user.uid}`).once('value').then((snapshot2) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { user, userType: snapshot.val().Type, userEmail: snapshot2.val().Email, userName: snapshot2.val().Name, userInfo: snapshot2.val() }
        });
        console.log(`Customer ${snapshot2.val().Email} logged in`);
        Actions.customer();
      });
    } else {
      firebase.database().ref(`/Provider/${user.uid}`).once('value').then((snapshot3) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { user, userType: snapshot.val().Type, userEmail: snapshot3.val().Email, userName: snapshot3.val().Name, userInfo: snapshot3.val() }
        });
        Actions.provider();
        console.log(`Provider ${snapshot3.val().Email} logged in`);
      });
    }
  });
};
