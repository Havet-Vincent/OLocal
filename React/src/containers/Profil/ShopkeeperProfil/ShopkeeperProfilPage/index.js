import { connect } from 'react-redux';
import {
  getUserData,
  deleteCatalogItem,
  updateCatalogItem,
  getRegionsData,
  setRegion,
  setFieldValue,
  handleSupplierSubmit,
} from 'src/actions/profil';

import ShopkeeperProfilPage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfilPage,
  catalog: state.profil.catalog,
  regions: state.home.regions,
  siret: state.profil.siret,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => {
    dispatch(getUserData());
  },

  onDelete: (data) => {
    dispatch(deleteCatalogItem(data));
  },

  onUpdate: (data) => {
    dispatch(updateCatalogItem(data));
  },

  getRegionsData: () => {
    dispatch(getRegionsData());
  },

  setFieldValue: (name, value) => {
    dispatch(setFieldValue(name, value));
  },

  handleSupplierSubmit: () => {
    dispatch(handleSupplierSubmit());
  },

  setRegion: (value) => {
    dispatch(setRegion(value));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfilPage);
