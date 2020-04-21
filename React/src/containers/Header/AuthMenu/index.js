import { connect } from 'react-redux';
import { setLogout } from 'src/actions/authentication';
import { getProfil } from 'src/actions/profil';

import AuthMenu from 'src/components/Header/AuthMenu';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  getProfil: () => {
    dispatch(getProfil());
  },
  setLogout: () => {
    dispatch(setLogout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthMenu);
