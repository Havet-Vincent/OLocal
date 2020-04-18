import { connect } from 'react-redux';
import { toggleSignUpForm } from 'src/actions/register';
import { toggleSignInForm, setLogout } from 'src/actions/authentication';

import Header from 'src/components/Header';

const mapStateToProps = (state) => ({
  signUp: state.register.signUpForm,
  signIn: state.authentication.signInForm,
  UserAuth: state.authentication.UserAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setSignUp: () => {
    dispatch(toggleSignUpForm());
  },
  setSignIn: () => {
    dispatch(toggleSignInForm());
  },
  setLogout: () => {
    dispatch(setLogout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
