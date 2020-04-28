import React, { useState, useEffect } from 'react';
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
import Loader from 'src/components/Loader';
import Home from 'src/containers/Home';
import ShopkeepersList from 'src/containers/ShopkeepersList';
import Shopkeeper from 'src/containers/Shopkeeper';
import ShopkeeperProfil from 'src/containers/Profil/ShopkeeperProfil';
import ShopkeeperProfilPage from 'src/containers/Profil/ShopkeeperProfil/ShopkeeperProfilPage';
import About from 'src/components/Pages/About';
import LegalNotices from 'src/components/Pages/LegalNotices';
import Contact from 'src/components/Pages/Contact';
import NotFound from 'src/components/Pages/NotFound';
import PrivateRoute from './PrivateRoute';

// Snackbar Alert & transition effect
const Alert = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const Pages = ({
  loaderCheckAuth,
  loaderUser,
  UserAuth,
  redirectTo,
  clearRedirectTo,
  snackbar,
  snackbarType,
  snackbarMessage,
  resetSnackbar,
}) => {
  const { pathname } = useLocation();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    clearRedirectTo();
  }, [pathname]);

  useEffect(() => {
    switch (pathname.slice(0, 18)) {
      case '/commercant/profil':
        setLoader(loaderUser);
        break;
      default:
        setLoader(loaderCheckAuth);
    }
  });

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    resetSnackbar();
  };

  return (
    <>
      <Loader loader={loader} />
      {!loader && (
        <Switch>
          {redirectTo && (
            <Redirect to={redirectTo} push />
          )}
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/liste-commercants">
            <ShopkeepersList />
          </Route>
          <Route exact path="/commercant/:id">
            <Shopkeeper />
          </Route>
          <Route path="/qui-sommes-nous">
            <About />
          </Route>
          <Route path="/mentions-legales">
            <LegalNotices />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <PrivateRoute
            exact
            path="/commercant/profil/informations"
            component={ShopkeeperProfil}
            isAuthenticated={UserAuth}
          />
          <PrivateRoute
            exact
            path="/commercant/profil/page"
            component={ShopkeeperProfilPage}
            isAuthenticated={UserAuth}
          />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
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
  loaderCheckAuth: PropTypes.bool.isRequired,
  loaderUser: PropTypes.bool.isRequired,
  UserAuth: PropTypes.bool.isRequired,
  redirectTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  clearRedirectTo: PropTypes.func.isRequired,
  snackbar: PropTypes.bool.isRequired,
  snackbarType: PropTypes.string.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  resetSnackbar: PropTypes.func.isRequired,
};


export default Pages;
