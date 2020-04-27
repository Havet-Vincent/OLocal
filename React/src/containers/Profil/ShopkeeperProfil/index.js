import { connect } from 'react-redux';
import {
  getUserData,
  setProfilFieldValue,
  setLogoPicture,
  setLogoPictureError,
  updateUserData,
  deleteUserAccount,
} from 'src/actions/profil';

import ShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfil,
  userData: state.profil.userData,
  email: state.profil.newEmail,
  logoPicture: state.profil.logoPicture,
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
