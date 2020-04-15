import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

// == Import components
import Home from 'src/containers/Home';
import ShopkeepersList from 'src/containers/ShopkeepersList';
import LegalNotices from 'src/components/Pages/LegalNotices';

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
      <Route path="/mentions-legales">
        <LegalNotices />
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
