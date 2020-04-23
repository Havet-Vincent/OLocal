import { connect } from 'react-redux';
import {
  setAuthFieldValue,
  setPwdCheckError,
  checkPasswordConfirmation,
  handleSignInSubmit,
} from 'src/actions/authentication';
import { setRegisterFieldValue } from 'src/actions/register';

import Password from 'src/components/Password';

const mapStateToProps = (state) => ({
  password: state.authentication.password,
  confirmPassword: state.authentication.confirmPassword,
  pwdCheckError: state.authentication.pwdCheckError,
  passwordLength: state.authentication.passwordLength,
  passwordConfirmed: state.authentication.passwordConfirmed,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setAuthFieldValue(name, value));
    dispatch(setRegisterFieldValue(name, value));
  },
  setPwdCheckError: (value) => {
    dispatch(setPwdCheckError(value));
  },
  checkPasswordConfirmation: () => {
    dispatch(checkPasswordConfirmation());
  },
  handleSignInSubmit: () => {
    dispatch(handleSignInSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Password);
