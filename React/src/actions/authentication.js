// action types
export const TOGGLE_SIGNIN_FORM = 'TOGGLE_SIGNIN_FORM';
export const SET_SIGNIN_FIELD_VALUE = 'SET_SIGNIN_FIELD_VALUE';
export const CHECK_PASSWORD_CONFIRMATION = 'CHECK_PASSWORD_CONFIRMATION';
export const SUBMIT_SIGNIN = 'SUBMIT_SIGNIN';
export const SAVE_AUTHENTICATION = 'SAVE_AUTHENTICATION';
export const FETCH_AUTHENTICATION = 'FETCH_AUTHENTICATION';
export const SET_USER_AUTH = 'SET_USER_AUTH';
export const SET_LOGOUT = 'SET_LOGOUT';
export const CLEAR_AUTH_DATA = 'CLEAR_AUTH_DATA';

// action creators
export const toggleSignInForm = () => ({
  type: TOGGLE_SIGNIN_FORM,
});

export const setAuthFieldValue = (name, value) => ({
  type: SET_SIGNIN_FIELD_VALUE,
  name,
  value,
});

export const checkPasswordConfirmation = () => ({
  type: CHECK_PASSWORD_CONFIRMATION,
});

export const handleSignInSubmit = () => ({
  type: SUBMIT_SIGNIN,
});

export const saveAuthentication = (token, refreshToken) => ({
  type: SAVE_AUTHENTICATION,
  token,
  refreshToken,
});

export const fetchAuth = () => ({
  type: FETCH_AUTHENTICATION,
});

export const setUserAuth = (token, refreshToken) => ({
  type: SET_USER_AUTH,
  token,
  refreshToken,
});

export const setLogout = () => ({
  type: SET_LOGOUT,
});

export const clearAuthData = () => ({
  type: CLEAR_AUTH_DATA,
});
