import { connect } from 'react-redux';
import {
  setRegionField,
  setCategoryField,
  handleSearchHomeSubmit,
} from 'src/actions/home';

import Search from 'src/components/Pages/Home/Search';

const mapStateToProps = (state) => ({
  categories: state.home.categories,
  regions: state.home.regions,
  categoryField: state.home.categoryField,
  regionField: state.home.regionField,
});

const mapDispatchToProps = (dispatch) => ({
  setRegionField: (id) => {
    dispatch(setRegionField(id));
  },
  setCategoryField: (id) => {
    dispatch(setCategoryField(id));
  },
  handleSearchHomeSubmit: () => {
    dispatch(handleSearchHomeSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
