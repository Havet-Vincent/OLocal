import { connect } from 'react-redux';
import { getCatalog, deleteCatalogItem, updateCatalogItem } from 'src/actions/profil';

import ShopkeeperProfilPage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage';

const mapStateToProps = (state) => ({
  loader: state.profil.loaderProfilPage,
  catalog: state.profil.catalog,
});

const mapDispatchToProps = (dispatch) => ({
  getCatalog: () => {
    dispatch(getCatalog());
  },
  onDelete: (data) => {
    dispatch(deleteCatalogItem(data));
  },
  onUpdate: (data) => {
    dispatch(updateCatalogItem(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeeperProfilPage);
