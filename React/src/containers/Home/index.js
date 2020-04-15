import { connect } from 'react-redux';
import { getRegionsData, getCategoriesData, resetSearchNotMatch } from 'src/actions/home';

import Home from 'src/components/Pages/Home';

const mapStateToProps = (state) => ({
  loadingRegions: state.home.loadingRegions,
  loadingCategories: state.home.loadingCategories,
  searchNotMatch: state.home.searchNotMatch,
});

const mapDispatchToProps = (dispatch) => ({
  getRegionsData: () => {
    dispatch(getRegionsData());
  },
  getCategoriesData: () => {
    dispatch(getCategoriesData());
  },
  resetSearchNotMatch: () => {
    dispatch(resetSearchNotMatch());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
