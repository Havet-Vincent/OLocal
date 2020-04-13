import React from 'react';
import { Route } from 'react-router-dom';
/*
https://reacttraining.com/react-router/web/api/Switch
- Routes sans Switch : il peut y avoir plusieurs routes qui correspondent à l'URL
- Routes englobées dans un Switch : on s'arrête à la première route qui correspond
à l'URL (nécessaire en particulier quand on veut une page d'erreur 404)
*/

// == Import components
import Home from 'src/components/Pages/Home';
import LegalNotices from 'src/components/Pages/LegalNotices';

const Pages = () => (
  <>
    <Route
      path="/"
      exact
    >
      <Home />
    </Route>
    <Route
      path="/mentions-légales"
    >
      <LegalNotices />
    </Route>
  </>
);

export default Pages;
