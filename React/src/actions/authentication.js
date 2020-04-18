// action types
export const TOGGLE_SIGNIN_FORM = 'TOGGLE_SIGNIN_FORM';
export const SET_SIGNIN_FIELD_VALUE = 'SET_SIGNIN_FIELD_VALUE';
export const CHECK_PASSWORD_CONFIRMATION = 'CHECK_PASSWORD_CONFIRMATION';
export const SUBMIT_SIGNIN = 'SUBMIT_SIGNIN';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_LOGOUT = 'SET_LOGOUT';

// action creators
export const toggleSignInForm = () => ({
  type: TOGGLE_SIGNIN_FORM,
});

export const setFieldValue = (name, value) => ({
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

export const setAuthentication = () => ({
  type: SET_AUTHENTICATION,
});

export const setLogout = () => ({
  type: SET_LOGOUT,
});
