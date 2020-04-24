import { connect } from 'react-redux';
import { getRegionsData } from 'src/actions/home';
import {
  setRegisterFieldValue,
  handleSignUpSubmit,
} from 'src/actions/register';

import SignUpForm from 'src/components/Header/SignUpForm';

const mapStateToProps = (state) => ({
  siret: state.register.siret,
  regions: state.home.regions,
  email: state.register.email,
});

const mapDispatchToProps = (dispatch) => ({
  getRegionsData: () => {
    dispatch(getRegionsData());
  },
  setFieldValue: (name, value) => {
    dispatch(setRegisterFieldValue(name, value));
  },
  handleSignUpSubmit: () => {
    dispatch(handleSignUpSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
