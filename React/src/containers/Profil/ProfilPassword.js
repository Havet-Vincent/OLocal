import { connect } from 'react-redux';
import {
  setAuthFieldValue,
  checkPasswordConfirmation,
} from 'src/actions/authentication';

import ProfilPassword from 'src/components/Pages/Profil/ProfilPassword';

const mapStateToProps = (state) => ({
  password: state.authentication.password,
  confirmPassword: state.authentication.confirmPassword,
  passwordConfirmed: state.authentication.passwordConfirmed,
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
)(ProfilPassword);
