// == Import npm
import React from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Container, Toolbar, Typography, Link,
} from '@material-ui/core';

// == Import styles
import footerStyles from './footerStyles';

// == Composant
const Footer = () => {
  const classes = footerStyles();
  return (
    <div>
      <Container fixed className={classes.footerWrapper}>
        <Toolbar className={classes.footerContent}>
          <Typography className={classes.root}>
            <Route>
              <Link component={RouterLink} to="/plan-du-site" className={classes.footerLink}>
                Plan du site
              </Link>
            </Route>
            <Route>
              <Link component={RouterLink} to="/mentions-legales" className={classes.footerLink}>
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
      </Container>
    </div>
  );
};

// == Export
export default Footer;
