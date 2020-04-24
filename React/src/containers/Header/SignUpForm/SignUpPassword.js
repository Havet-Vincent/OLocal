import { connect } from 'react-redux';
import {
  setRegisterFieldValue,
  checkPasswordConfirmation,
} from 'src/actions/register';

import SignUpPassword from 'src/components/Header/SignUpForm/SignUpPassword';

const mapStateToProps = (state) => ({
  password: state.register.password,
  confirmPassword: state.register.confirmPassword,
  passwordLength: state.register.passwordLength,
  passwordConfirmed: state.register.passwordConfirmed,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setRegisterFieldValue(name, value));
  },
  checkPasswordConfirmation: () => {
    dispatch(checkPasswordConfirmation());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPassword);
