import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_PROVIDER_SUCCESS,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  feedback: '',
  userType: null,
  userEmail: null,
  userName: null,
  userInfo: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '', feedback: '' };
    case LOGIN_USER_SUCCESS:
    console.log(`User Name: ${action.payload.userName} \nUser ID: ${action.payload.user.uid} \nUser Type: ${action.payload.userType}`);
      return { ...state, ...INITIAL_STATE, user: action.payload.user, userType: action.payload.userType, userEmail: action.payload.userEmail, userName: action.payload.userName, userInfo: action.payload.userInfo };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Wrong Email or password', password: '', loading: false, feedback: '' };
    case CREATE_CUSTOMER_SUCCESS:
      return { ...state, ...INITIAL_STATE, feedback: 'Customer created successfully' };
    case CREATE_PROVIDER_SUCCESS:
      return { ...state, ...INITIAL_STATE, feedback: 'Provider created successfully' };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE, feedback: 'You have logged out successfully' };
    default:
      return state;
  }
};
