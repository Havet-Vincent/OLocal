import { connect } from 'react-redux';
import { getProfil, getProfilPage, setActivePage } from 'src/actions/profil';

import NavbarShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';

const mapStateToProps = (state) => ({
  activePage: state.profil.activePage,
});

const mapDispatchToProps = (dispatch) => ({
  getProfil: () => {
    dispatch(getProfil());
  },
  getProfilPage: () => {
    dispatch(getProfilPage());
  },
  setActivePage: (newValue) => {
    dispatch(setActivePage(newValue));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarShopkeeperProfil);
