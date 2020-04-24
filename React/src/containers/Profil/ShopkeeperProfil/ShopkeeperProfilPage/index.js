import { connect } from 'react-redux';
import {
  getUserData,
  deleteCatalogItem,
  updateCatalogItem,
  addCatalogItem,
  setRegion,
  setFieldValue,
  handleSupplierSubmit,
  getSuppliersByRegion,
} from 'src/actions/profil';

import { getRegionsData } from 'src/actions/home';

import ShopkeeperProfilPage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfilPage,
  catalog: state.profil.catalog,
  regions: state.home.regions,
  siret: state.profil.siret,
  suppliers: state.profil.suppliers,
  currentRegion: state.profil.currentRegion,
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

  onAdd: (data) => {
    dispatch(addCatalogItem(data));
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

  getSuppliersByRegion: () => {
    dispatch(getSuppliersByRegion());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfilPage);
