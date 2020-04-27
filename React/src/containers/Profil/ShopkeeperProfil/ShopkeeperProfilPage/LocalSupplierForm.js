import { connect } from 'react-redux';
import {
  setFieldValue,
  AddLocalSupplier,
  toogleSupplierForm,
} from 'src/actions/profil';

import LocalSupplierForm from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage/LocalSupplierForm';

const mapStateToProps = (state) => ({
  loaderAddSupplier: state.profil.loaderAddSupplier,
  openSupplierForm: state.profil.openSupplierForm,
  regions: state.home.regions,
  supplierRegion: state.profil.supplierRegion,
  siret: state.profil.siret,
});

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value) => {
    dispatch(setFieldValue(name, value));
  },
  handleAddLocalSupplier: () => {
    dispatch(AddLocalSupplier());
  },
  handleCloseSupplierForm: () => {
    dispatch(toogleSupplierForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocalSupplierForm);
