// action types
export const TOGGLE_SIGNUP_FORM= 'TOGGLE_SIGNUP_FORM';
export const TOGGLE_SIGNIN_FORM= 'TOGGLE_SIGNIN_FORM';
export const SET_FIELD_VALUE= 'SET_FIELD_VALUE';
export const CHECK_PASSWORD_CONFIRMATION= 'CHECK_PASSWORD_CONFIRMATION';
export const SUBMIT_SIGNUP= 'SUBMIT_SIGNUP';

// action creators
export const toggleSignUpForm = () => ({
  type: TOGGLE_SIGNUP_FORM,
});

export const toggleSignInForm = () => ({
  type: TOGGLE_SIGNIN_FORM,
});

export const setFieldValue = (name, value) => ({
  type: SET_FIELD_VALUE,
  name,
  value,
});

export const checkPasswordConfirmation = () => ({
  type: CHECK_PASSWORD_CONFIRMATION,
});

export const handleSignupSubmit = () => ({
  type: SUBMIT_SIGNUP,
});
