import {
  TOGGLE_SIGNUP_FORM,
  TOGGLE_SIGNIN_FORM,
  SET_FIELD_VALUE,
  CHECK_PASSWORD_CONFIRMATION,
  SET_REGISTER,
} from '../actions/register';

const initialState = {
  // Display signUp/signIn form
  signUpForm: false,
  signInForm: false,
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
      // State reset on manualy close
      if (state.signUpForm === true) {
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
      }
      return {
        ...state,
        signUpForm: !state.signUpForm,
      };

    case TOGGLE_SIGNIN_FORM:
      return {
        ...state,
        signInForm: !state.signInForm,
      };

    case SET_FIELD_VALUE:
      if (action.name === 'password') {
        return {
          ...state,
          [action.name]: action.value,
        };
      }
      return {
        ...state,
        [action.name]: action.value,
      };

    case CHECK_PASSWORD_CONFIRMATION:
      // Password verification
      if (state.passwordLength >= 7 && state.password === state.confirmPassword) {
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

    case SET_REGISTER: {
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
    }

    default: return state;
  }
};

export default registerReducer;
