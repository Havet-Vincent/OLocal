import {
  TOGGLE_SIGNUP_FORM,
  SET_SIGNUP_FIELD_VALUE,
  CHECK_PASSWORD_CONFIRMATION,
  SET_REGISTER,
} from '../actions/register';

const initialState = {
  // Display signUp form
  signUpForm: false,
  // Signup form fields values
  siret: '',
  region: '',
  email: '',
  password: '',
  confirmPassword: '',
  // Password Confirmation
  passwordLength: 0,
  passwordConfirmed: false,
};

const registerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SIGNUP_FORM:
      return {
        ...state,
        signUpForm: !state.signUpForm,
        email: '',
        siret: '',
        password: '',
        confirmPassword: '',
        passwordLength: 0,
        passwordConfirmed: false,
      };

    case SET_SIGNUP_FIELD_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };

    case CHECK_PASSWORD_CONFIRMATION:
      // Password verification
      if (state.password === state.confirmPassword) {
        return {
          ...state,
          passwordConfirmed: true,
        };
      }
      return {
        ...state,
        passwordLength: state.password.length,
        passwordConfirmed: false,
      };

    case SET_REGISTER:
      return {
        ...state,
        signUpForm: false,
        siret: '',
        region: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordLength: 0,
        passwordConfirmed: false,
      };

    default: return state;
  }
};

export default registerReducer;
