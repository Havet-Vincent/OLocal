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
import ShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil';
import ShopkeeperProfilPage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage';
import PlanDuSite from 'src/components/Pages/PlanDuSite';
import LegalNotices from 'src/components/Pages/LegalNotices';
import Contact from 'src/components/Pages/Contact';
import NotFound from 'src/components/Pages/NotFound';

<<<<<<< HEAD
// Snackbar Alert & transition effect
const Alert = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
=======
const Pages = ({ redirectTo }) => (
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
      <Route exact path="/commercant/:id">
        <Shopkeeper />
      </Route>
      <Route exact path="/commercant/profil/informations">
        <ShopkeeperProfil />
      </Route>
      <Route exact path="/commercant/profil/page">
        <ShopkeeperProfilPage />
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
  </>
>>>>>>> PageProfilShopkeeper
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
        <Route>
          <NotFound />
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
