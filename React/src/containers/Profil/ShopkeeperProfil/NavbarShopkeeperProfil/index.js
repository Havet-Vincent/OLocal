import { connect } from 'react-redux';
import { getProfil, getProfilPage } from 'src/actions/profil';

import NavbarShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  getProfil: () => {
    dispatch(getProfil());
  },
  getProfilPage: () => {
    dispatch(getProfilPage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarShopkeeperProfil);
