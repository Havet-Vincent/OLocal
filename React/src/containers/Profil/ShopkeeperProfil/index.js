import { connect } from 'react-redux';
import {
  getUserData,
  setProfilFieldValue,
  setLogoPicture,
  setLogoPictureError,
  setFieldError,
  updateUserData,
  deleteUserAccount,
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
    dispatch(setProfilFieldValue(name, value));
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
  handleDeleteUserAccount: () => {
    dispatch(deleteUserAccount());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfil);
