import { connect } from 'react-redux';
import { setLogout } from 'src/actions/authentication';

import AuthMenu from 'src/components/Header/AuthMenu';

const mapStateToProps = (state) => ({
  userId: state.profil.userId,
});

const mapDispatchToProps = (dispatch) => ({
  setLogout: () => {
    dispatch(setLogout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthMenu);
