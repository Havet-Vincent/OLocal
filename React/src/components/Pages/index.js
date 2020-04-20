import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

// == Import components
import Home from 'src/containers/Home';
import ShopkeepersList from 'src/containers/ShopkeepersList';
import Shopkeeper from 'src/containers/Shopkeeper';
import ShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil';
import ShopkeeperProfilPage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilPage';
import PlanDuSite from 'src/components/Pages/PlanDuSite';
import LegalNotices from 'src/components/Pages/LegalNotices';
import Contact from 'src/components/Pages/Contact';

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
);

Pages.propTypes = {
  redirectTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
};


export default Pages;
