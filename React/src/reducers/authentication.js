import {
  TOGGLE_SIGNIN_FORM,
  SET_SIGNIN_FIELD_VALUE,
  CHECK_PASSWORD_CONFIRMATION,
  SAVE_AUTHENTICATION,
  SET_USER_AUTH,
  SET_LOGOUT,
} from '../actions/authentication';

const initialState = {
  // Display signIn form
  signInForm: false,
  // SignIn form fields values
  email: '',
  password: '',
  confirmPassword: '',
  // Password Confirmation
  passwordLength: 0,
  passwordConfirmed: false,
  // User authentication
  token: null,
  refreshToken: null,
  UserAuth: false,
};

const authenticationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SIGNIN_FORM:
      return {
        ...state,
        signInForm: !state.signInForm,
        email: '',
        password: '',
        confirmPassword: '',
        passwordLength: 0,
        passwordConfirmed: false,
      };

    case SET_SIGNIN_FIELD_VALUE:
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

    case SAVE_AUTHENTICATION:
      return {
        ...state,
        signInForm: false,
        email: '',
        password: '',
        confirmPassword: '',
        passwordLength: 0,
        passwordConfirmed: false,
        token: action.token,
        refreshToken: action.refreshToken,
        UserAuth: true,
      };

    case SET_USER_AUTH:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
        UserAuth: true,
      };

    case SET_LOGOUT:
      return {
        ...state,
        UserAuth: false,
      };

    default: return state;
  }
};

export default authenticationReducer;
