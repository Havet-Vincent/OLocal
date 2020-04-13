// == Import npm
import React from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  AppBar, Toolbar, Typography, Link,
} from '@material-ui/core';

// == Import styles
import footerStyles from './footerStyles';

// == Composant
const Footer = () => {
  const classes = footerStyles();
  return (
    <div>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.root}>
            <Route>
              <Link component={RouterLink} to="/plan-du-site" className={classes.footerLink}>
                Plan du site
              </Link>
            </Route>
            <Route>
              <Link component={RouterLink} to="/mentions-légales" className={classes.footerLink}>
                Mentions Légales
              </Link>
            </Route>
            <Route>
              <Link component={RouterLink} to="/contact" className={classes.footerLink}>
                Contact
              </Link>
            </Route>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// == Export
export default Footer;
