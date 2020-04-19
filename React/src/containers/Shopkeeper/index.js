import { connect } from 'react-redux';
import { getShopkeeperData, changeProductsCategory } from 'src/actions/shopkeepers';

import Shopkeeper from 'src/components/Pages/Shopkeeper';

const mapStateToProps = (state) => ({
  loader: state.shopkeepers.loader,
  shopkeeper: state.shopkeepers.shopkeeper,
  productsCategoryId: state.shopkeepers.productsCategoryId,
  uniqueCategories: state.shopkeepers.uniqueCategories,
  productsByCategory: state.shopkeepers.productsByCategory,
});

const mapDispatchToProps = (dispatch) => ({
  getShopkeeperData: (shopkeeperId) => {
    dispatch(getShopkeeperData(shopkeeperId));
  },
  changeProductsCategory: (productsCategoryId) => {
    dispatch(changeProductsCategory(productsCategoryId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shopkeeper);
