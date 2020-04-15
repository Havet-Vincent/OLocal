import { connect } from 'react-redux';

import ShopkeepersList from 'src/components/Pages/ShopkeepersList';

const mapStateToProps = (state) => ({
  searchResults: state.shopkeepers.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeepersList);
