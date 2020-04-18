import { connect } from 'react-redux';
import { getRegionsData, getCategoriesData } from 'src/actions/home';

import Home from 'src/components/Pages/Home';

const mapStateToProps = (state) => ({
  loadingRegions: state.home.loadingRegions,
  loadingCategories: state.home.loadingCategories,
});

const mapDispatchToProps = (dispatch) => ({
  getRegionsData: () => {
    dispatch(getRegionsData());
  },
  getCategoriesData: () => {
    dispatch(getCategoriesData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
