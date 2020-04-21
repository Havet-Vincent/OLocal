import { connect } from 'react-redux';
import { getUserData, clearUSerData } from 'src/actions/profil';

import ShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil';

const mapStateToProps = (state) => ({
  loader: state.profil.loader,
  userData: state.profil.userData,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => {
    dispatch(getUserData());
  },
  clearUSerData: () => {
    dispatch(clearUSerData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfil);
