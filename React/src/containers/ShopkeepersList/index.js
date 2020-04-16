import { connect } from 'react-redux';
import { getShopkeeperData } from 'src/actions/shopkeepers';

import ShopkeepersList from 'src/components/Pages/ShopkeepersList';

const mapStateToProps = (state) => ({
  currentRegion: state.shopkeepers.currentRegion,
  currentCategory: state.shopkeepers.currentCategory,
  searchResults: state.shopkeepers.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
  getShopkeeperData: (shopkeeperId) => {
    dispatch(getShopkeeperData(shopkeeperId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopkeepersList);
