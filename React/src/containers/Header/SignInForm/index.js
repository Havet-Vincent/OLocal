import { connect } from 'react-redux';
import {
  setAuthFieldValue,
  handleSignInSubmit,
} from 'src/actions/authentication';

import SignInForm from 'src/components/Header/SignInForm';

const mapStateToProps = (state) => ({
  email: state.authentication.email,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setAuthFieldValue(name, value));
  },
  handleSignInSubmit: () => {
    dispatch(handleSignInSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInForm);
