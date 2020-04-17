import { connect } from 'react-redux';
import { getRegionsData, getCategoriesData, resetSnackbar } from 'src/actions/home';

import Home from 'src/components/Pages/Home';

const mapStateToProps = (state) => ({
  loadingRegions: state.home.loadingRegions,
  loadingCategories: state.home.loadingCategories,
  snackbar: state.home.snackbar,
  snackbarType: state.home.snackbarType,
  snackbarMessage: state.home.snackbarMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getRegionsData: () => {
    dispatch(getRegionsData());
  },
  getCategoriesData: () => {
    dispatch(getCategoriesData());
  },
  resetSnackbar: () => {
    dispatch(resetSnackbar());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
