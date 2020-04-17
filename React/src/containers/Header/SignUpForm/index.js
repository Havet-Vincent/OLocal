import { connect } from 'react-redux';
import {
  setFieldValue,
  checkPasswordConfirmation,
  handleSignupSubmit,
} from 'src/actions/register';

import SignUpForm from 'src/components/Header/SignUpForm';

const mapStateToProps = (state) => ({
  siret: state.register.siret,
  regions: state.home.regions,
  email: state.register.email,
  password: state.register.password,
  confirmPassword: state.register.confirmPassword,
  passwordLength: state.register.passwordLength,
  passwordConfirmed: state.register.passwordConfirmed,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setFieldValue(name, value));
  },
  checkPasswordConfirmation: () => {
    dispatch(checkPasswordConfirmation());
  },
  handleSignupSubmit: () => {
    dispatch(handleSignupSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
