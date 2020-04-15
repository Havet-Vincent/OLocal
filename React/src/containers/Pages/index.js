import { connect } from 'react-redux';

import Pages from 'src/components/Pages';

const mapStateToProps = (state) => ({
  redirectTo: state.home.redirectTo,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pages);
