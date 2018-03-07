import {
  CUSTOMER_NAME_CHANGED,
  CUSTOMER_EMAIL_CHANGED,
  CUSTOMER_ADDRESS_CHANGED,
  CUSTOMER_PASSWORD_CHANGED,
  CUSTOMER_CONFIRM_PASSWORD_CHANGED,
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_FAIL,
  CREATE_CUSTOMER_SUCCESS,
  EMAIL_USED,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  cName: '',
  cEmail: '',
  cAddress: '',
  cPassword: '',
  cConfirmPassword: '',
  cLoading: false,
  FBcName: '',
  FBcEmail: '',
  FBcAddress: '',
  FBcPassword: '',
  FBcConfirmPassword: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMER_NAME_CHANGED:
      return { ...state, cName: action.payload };
    case CUSTOMER_EMAIL_CHANGED:
      return { ...state, cEmail: action.payload };
    case CUSTOMER_ADDRESS_CHANGED:
      return { ...state, cAddress: action.payload };
    case CUSTOMER_PASSWORD_CHANGED:
      return { ...state, cPassword: action.payload };
    case CUSTOMER_CONFIRM_PASSWORD_CHANGED:
      return { ...state, cConfirmPassword: action.payload };
    case CREATE_CUSTOMER:
      return { ...state,
        cLoading: true,
        FBcName: '',
        FBcEmail: '',
        FBcAddress: '',
        FBcPassword: '',
        FBcConfirmPassword: ''
      };
    case CREATE_CUSTOMER_FAIL:
      return { ...state,
        cLoading: false,
        FBcName: action.payload.FBN,
        FBcEmail: action.payload.FBE,
        FBcAddress: action.payload.FBA,
        FBcPassword: action.payload.FBP,
        FBcConfirmPassword: action.payload.FBC
      };
    case CREATE_CUSTOMER_SUCCESS:
      return { ...state, ...INITIAL_STATE, cLoading: false };
    case EMAIL_USED:
      return { ...state, cLoading: false, FBcEmail: action.payload };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
      default:
      return state;
    }
  };
