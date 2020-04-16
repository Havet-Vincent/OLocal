import React from 'react';
import { Route } from 'react-router-dom';

// == Import components
import Home from 'src/containers/Home';
import Shopkeeper from 'src/components/Pages/Shopkeeper';
import LegalNotices from 'src/components/Pages/LegalNotices';
import Contact from 'src/components/Pages/Contact';
import PlanDuSite from 'src/components/Pages/PlanDuSite';

const Pages = () => (
  <>
    <Route
      path="/"
      exact
    >
      <Home />
    </Route>
    <Route
      path="/shopkeeper/costa"
    >
      <Shopkeeper />
    </Route>
    <Route
      path="/mentions-légales"
    >
      <LegalNotices />
    </Route>
    <Route
      path="/contact"
    >
      <Contact />
    </Route>
    <Route
      path="/plan-du-site"
    >
      <PlanDuSite />
    </Route>
  </>
);

export default Pages;
