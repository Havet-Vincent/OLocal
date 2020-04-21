import { connect } from 'react-redux';
import { getUserData, clearUserData } from 'src/actions/profil';

import ShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfil,
  userData: state.profil.userData,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => {
    dispatch(getUserData());
  },
  clearUserData: () => {
    dispatch(clearUserData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfil);
