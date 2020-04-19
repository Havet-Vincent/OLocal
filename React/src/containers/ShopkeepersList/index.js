import { connect } from 'react-redux';

import ShopkeepersList from 'src/components/Pages/ShopkeepersList';

const mapStateToProps = (state) => ({
  currentRegion: state.shopkeepers.currentRegion,
  currentCategory: state.shopkeepers.currentCategory,
  searchResults: state.shopkeepers.searchResults,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeepersList);
