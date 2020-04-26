import { connect } from 'react-redux';
import {
  getUserData,
  addCatalogItem,
  deleteCatalogItem,
  updateCatalogItem,
  handleSupplierSubmit,
} from 'src/actions/profil';
import { getCategoriesData } from 'src/actions/home';

import ShopkeeperProfilPage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfilPage,
  catalog: state.profil.catalog,
  categories: state.home.categories,
  currentRegion: state.profil.userData.length > 0 ? state.profil.userData.region : [],
  siret: state.profil.siret,
  suppliers: state.profil.suppliers,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => {
    dispatch(getUserData());
  },
  getCategoriesData: () => {
    dispatch(getCategoriesData());
  },
  addCatalogItem: (data) => {
    dispatch(addCatalogItem(data));
  },
  deleteCatalogItem: (data) => {
    dispatch(deleteCatalogItem(data));
  },
  updateCatalogItem: (data) => {
    dispatch(updateCatalogItem(data));
  },
  handleSupplierSubmit: () => {
    dispatch(handleSupplierSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfilPage);
