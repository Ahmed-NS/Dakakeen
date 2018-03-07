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
  PROVIDER_PHONE_CHANGED,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  pName: '',
  pEmail: '',
  pNationalID: '',
  pPhone: '',
  pAddress: '',
  pPassword: '',
  pConfirmPassword: '',
  pLoading: false,
  FBpName: '',
  FBpEmail: '',
  FBpNationalID: '',
  FBpPhone: '',
  FBpAddress: '',
  FBpPassword: '',
  FBpConfirmPassword: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROVIDER_NAME_CHANGED:
    console.log('(((  Provider PROVIDER_NAME_CHANGED  )))');
      return { ...state, pName: action.payload };
    case PROVIDER_EMAIL_CHANGED:
    console.log('(((  Provider PROVIDER_EMAIL_CHANGED  )))');
      return { ...state, pEmail: action.payload };
    case PROVIDER_NATIONALID_CHANGED:
    console.log('(((  Provider PROVIDER_NATIONALID_CHANGED  )))');
      return { ...state, pNationalID: action.payload };
    case PROVIDER_PHONE_CHANGED:
    console.log('(((  Provider PROVIDER_PHONE_CHANGED  )))');
      return { ...state, pPhone: action.payload };
    case PROVIDER_ADDRESS_CHANGED:
    console.log('(((  Provider PROVIDER_ADDRESS_CHANGED  )))');
      return { ...state, pAddress: action.payload };
    case PROVIDER_PASSWORD_CHANGED:
    console.log('(((  Provider PROVIDER_PASSWORD_CHANGED  )))');
      return { ...state, pPassword: action.payload };
    case PROVIDER_CONFIRM_PASSWORD_CHANGED:
    console.log('(((  Provider PROVIDER_CONFIRM_PASSWORD_CHANGED  )))');
      return { ...state, pConfirmPassword: action.payload };
    case CREATE_PROVIDER:
    console.log('(((  Provider CREATE_PROVIDER  )))');
      return { ...state,
        pLoading: true,
        FBpName: '',
        FBpEmail: '',
        FBpAddress: '',
        FBpPassword: '',
        FBpConfirmPassword: ''
      };
    case CREATE_PROVIDER_FAIL:
    console.log('(((  Provider CREATE_PROVIDER_FAIL  )))');
      return { ...state,
        pLoading: false,
        FBpName: action.payload.FBN,
        FBpEmail: action.payload.FBE,
        FBpNationalID: action.payload.FBNI,
        FBpPhone: action.payload.FBPH,
        FBpAddress: action.payload.FBA,
        FBpPassword: action.payload.FBP,
        FBpConfirmPassword: action.payload.FBC
      };
    case CREATE_PROVIDER_SUCCESS:
    console.log('(((  Provider CREATE_PROVIDER_SUCCESS  )))');
      return { ...state, ...INITIAL_STATE, pLoading: false };
    case EMAIL_USED:
    console.log('(((  Provider EMAIL_USED  )))');
      return { ...state, pLoading: false, FBpEmail: action.payload };
    case LOGOUT:
    console.log('(((  Provider LOGOUT  )))');
      return { ...state, ...INITIAL_STATE };
      default:
      return state;
    }
  };
