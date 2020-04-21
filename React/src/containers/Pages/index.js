import { connect } from 'react-redux';
import { clearRedirect, resetSnackbar } from 'src/actions/home';

import Pages from 'src/components/Pages';

const mapStateToProps = (state) => ({
  loaderCheckAuth: state.authentication.loaderCheckAuth,
  UserAuth: state.authentication.UserAuth,
  redirectTo: state.home.redirectTo,
  snackbar: state.home.snackbar,
  snackbarType: state.home.snackbarType,
  snackbarMessage: state.home.snackbarMessage,
});

const mapDispatchToProps = (dispatch) => ({
  clearRedirectTo: () => {
    dispatch(clearRedirect());
  },
  resetSnackbar: () => {
    dispatch(resetSnackbar());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pages);
