import { connect } from 'react-redux';

import Shopkeeper from 'src/components/Pages/Shopkeeper';

const mapStateToProps = (state) => ({
  shopkeeper: state.shopkeepers.shopkeeper,
  currentCategory: state.shopkeepers.currentCategory,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shopkeeper);
