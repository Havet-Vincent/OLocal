import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';

// == Import components
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Home from 'src/containers/Home';
import ShopkeepersList from 'src/containers/ShopkeepersList';
import Shopkeeper from 'src/containers/Shopkeeper';
import PlanDuSite from 'src/components/Pages/PlanDuSite';
import LegalNotices from 'src/components/Pages/LegalNotices';
import Contact from 'src/components/Pages/Contact';

// Snackbar Alert & transition effect
const Alert = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const Pages = ({
  redirectTo,
  snackbar,
  snackbarType,
  snackbarMessage,
  resetSnackbar,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    resetSnackbar();
  };

  return (
    <>
      {redirectTo && (
        <Redirect to={redirectTo} push />
      )}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/liste-commercants">
          <ShopkeepersList />
        </Route>
        <Route path="/commercant/:id">
          <Shopkeeper />
        </Route>
        <Route path="/plan-du-site">
          <PlanDuSite />
        </Route>
        <Route path="/mentions-legales">
          <LegalNotices />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

Pages.propTypes = {
  redirectTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  snackbar: PropTypes.bool.isRequired,
  snackbarType: PropTypes.string.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  resetSnackbar: PropTypes.func.isRequired,
};


export default Pages;
