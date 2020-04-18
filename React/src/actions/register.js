// action types
export const TOGGLE_SIGNUP_FORM = 'TOGGLE_SIGNUP_FORM';
export const SET_SIGNUP_FIELD_VALUE = 'SET_SIGNUP_FIELD_VALUE';
export const CHECK_PASSWORD_CONFIRMATION = 'CHECK_PASSWORD_CONFIRMATION';
export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
export const SET_REGISTER = 'SET_REGISTER';

// action creators
export const toggleSignUpForm = () => ({
  type: TOGGLE_SIGNUP_FORM,
});

export const setFieldValue = (name, value) => ({
  type: SET_SIGNUP_FIELD_VALUE,
  name,
  value,
});

export const checkPasswordConfirmation = () => ({
  type: CHECK_PASSWORD_CONFIRMATION,
});

export const handleSignupSubmit = () => ({
  type: SUBMIT_SIGNUP,
});

export const setRegister = () => ({
  type: SET_REGISTER,
});
