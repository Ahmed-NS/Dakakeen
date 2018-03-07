import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  LOGOUT
} from './types';

export const logout = (userEmail) => {
  return (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
      console.log(`User ${userEmail} logged out`);
      dispatch({ type: LOGOUT });
      Actions.popTo('login');
    })
    .catch((error) => {
      console.log(error);
    });
  };
};
