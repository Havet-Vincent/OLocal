import { connect } from 'react-redux';
import { toggleSignUpForm, toggleSignInForm } from 'src/actions/register';

import Header from 'src/components/Header';

const mapStateToProps = (state) => ({
  signUp: state.register.signUpForm,
  signIn: state.register.signInForm,
});

const mapDispatchToProps = (dispatch) => ({
  setSignUp: () => {
    dispatch(toggleSignUpForm());
  },
  setSignIn: () => {
    dispatch(toggleSignInForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
