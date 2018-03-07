import firebase from 'firebase';
import {
  UPDATE_RATE,
  NEW_RATE
} from './types';

export const updateRate = ({ oid, rating, ratings }) => {
  console.log('ratings = %O', ratings);
  ratings[oid] = rating;
  return {
    type: UPDATE_RATE,
    payload: ratings
  };
};

export const rate = ({ uid, oid, pid, rating }) => {
  console.log('pid ==> ', pid);
  if (rating !== 0) {
    return (dispatch) => {
      firebase.database().ref(`/Order/${uid}/${oid}`).once('value').then((snapshot) => {
        console.log('snapshot.val() ==> %O', snapshot.val());
        firebase.database().ref(`/Order/${uid}/${oid}`)
        .set({
          ...snapshot.val(), Rate: rating
        })
        .then(() => {
          firebase.database().ref(`/Provider/${pid}`).once('value').then((data) => {
            firebase.database().ref(`/Provider/${pid}`)
            .set({
              ...data.val(),
              Rate: Math.round((((data.val().Rate * data.val().numberOfRatings) + rating) / (data.val().numberOfRatings + 1)) * 100) / 100,
              numberOfRatings: data.val().numberOfRatings + 1
            })
            .then(() => {
              dispatch({
                type: NEW_RATE,
                payload: 'Provider rated successfully'
              });
            });
          })
          .catch((e) => {
            console.log(e);
          });
        })
        .catch((e) => {
          console.log(e);
        });
      });
    };
  }
  return {
    type: 'test'
  };
};
