import { connect } from 'react-redux';

import Search from 'src/components/Pages/Home/Search';

const mapStateToProps = (state) => ({
  categories: state.home.categories,
  regions: state.home.regions,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
