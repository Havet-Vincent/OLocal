import { connect } from 'react-redux';
import {
  setAuthFieldValue,
  checkPasswordConfirmation,
} from 'src/actions/authentication';

import SignInPassword from 'src/components/Header/SignInForm/SignInPassword';

const mapStateToProps = (state) => ({
  password: state.authentication.password,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setAuthFieldValue(name, value));
  },
  checkPasswordConfirmation: () => {
    dispatch(checkPasswordConfirmation());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInPassword);
