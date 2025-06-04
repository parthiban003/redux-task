import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_MESSAGES
} from './Actions';

const initialState = {
  loading: false,
  successMessage: '',
  loginMessage: '',
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, successMessage: '', loginMessage: '' };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload };

    case REGISTER_FAILURE:
      return { ...state, loading: false, successMessage: action.payload };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, loginMessage: action.payload };

    case LOGIN_FAILURE:
      return { ...state, loading: false, loginMessage: action.payload };

      case CLEAR_MESSAGES:
        return {...state, successMessage: '', loginMessage:''}

    default:
      return state;
  }
};
