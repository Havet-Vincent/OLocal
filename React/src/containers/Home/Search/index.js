import { connect } from 'react-redux';
import {
  setRegion,
  setCategory,
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
  setRegion: (value) => {
    dispatch(setRegion(value));
  },
  setCategory: (value) => {
    dispatch(setCategory(value));
  },
  handleSearchHomeSubmit: () => {
    dispatch(handleSearchHomeSubmit());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
