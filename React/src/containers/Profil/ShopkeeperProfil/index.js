import { connect } from 'react-redux';
import { getUserData } from 'src/actions/profil';

import ShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfil,
  userData: state.profil.userData,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => {
    dispatch(getUserData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfil);
