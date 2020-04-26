import { connect } from 'react-redux';
import {
  getUserData,
  updateCatalogItem,
  editCatalogField,
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
  editCatalogField: (value) => {
    dispatch(editCatalogField(value));
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
