import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

// == Import components
import Home from 'src/containers/Home';
import ShopkeepersList from 'src/containers/ShopkeepersList';
import Shopkeeper from 'src/containers/Shopkeeper';
import PlanDuSite from 'src/components/Pages/PlanDuSite';
import LegalNotices from 'src/components/Pages/LegalNotices';
import Contact from 'src/components/Pages/Contact';

const Pages = ({ redirectTo }) => (
  <>
    {redirectTo && (
      <Redirect to={redirectTo} />
    )}
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/liste-commercants">
        <ShopkeepersList />
      </Route>
      <Route strict path="/commercant/:id">
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
  </>
);

Pages.propTypes = {
  redirectTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
};


export default Pages;
