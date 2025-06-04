// Action types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const clearMessages = () => ({ type: CLEAR_MESSAGES });
export const registerUser = (payload) => ({ type: REGISTER_REQUEST, payload });
export const loginUser = (payload, navigate) => ({ type: LOGIN_REQUEST, payload, navigate });
