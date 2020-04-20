import { connect } from 'react-redux';
import { fetchAuth } from 'src/actions/authentication';

import App from 'src/components/App';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchAuth: () => {
    dispatch(fetchAuth());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
