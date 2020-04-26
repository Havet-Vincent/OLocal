import { connect } from 'react-redux';
import {
  getUserData,
  addCatalogItem,
  deleteCatalogItem,
  updateCatalogItem,
  handleSupplierSubmit,
} from 'src/actions/profil';
import { getCategoriesData, getRegionsData } from 'src/actions/home';

import ShopkeeperProfilPage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfilPage,
  catalog: state.profil.catalog,
  categories: state.home.categories,
  regions: state.home.regions,
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
  getRegionsData: () => {
    dispatch(getRegionsData());
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
  setFieldValue: (name, value) => {
    dispatch(setFieldValue(name, value));
  },
  handleSupplierSubmit: () => {
    dispatch(handleSupplierSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfilPage);
