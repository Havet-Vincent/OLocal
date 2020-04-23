import { connect } from 'react-redux';
import {
  setFieldValue,
  checkPasswordConfirmation,
  handleSignInSubmit,
} from 'src/actions/authentication';

import Password from 'src/components/Password';

const mapStateToProps = (state) => ({
  password: state.authentication.password,
  confirmPassword: state.authentication.confirmPassword,
  passwordLength: state.authentication.passwordLength,
  passwordConfirmed: state.authentication.passwordConfirmed,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setFieldValue(name, value));
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
