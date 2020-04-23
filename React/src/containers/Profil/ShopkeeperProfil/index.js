import { connect } from 'react-redux';
import {
  getUserData,
  setFieldValue,
  setLogoPicture,
  setLogoPictureError,
  setFieldError,
  updateUserData,
} from 'src/actions/profil';

import ShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfil,
  userData: state.profil.userData,
  logoPicture: state.profil.logoPicture,
  fieldError: state.profil.fieldError,
  pwdCheckError: state.authentication.pwdCheckError,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setFieldValue(name, value));
  },
  setLogoPicture: (newLogoPicture) => {
    dispatch(setLogoPicture(newLogoPicture));
  },
  setLogoPictureError: (errorMsg) => {
    dispatch(setLogoPictureError(errorMsg));
  },
  getUserData: () => {
    dispatch(getUserData());
  },
  setFieldError: (value) => {
    dispatch(setFieldError(value));
  },
  handleUpdateUserData: () => {
    dispatch(updateUserData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfil);
