// == Import npm
import React from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Container, Toolbar, Typography, Link, Tooltip,
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
              <Tooltip title="Qui sommes-nous?" aria-label="qui-sommes-nous" placement="top">
                <Link component={RouterLink} to="/qui-sommes-nous" className={classes.footerLink}>
                  Qui sommes-nous?
                </Link>
              </Tooltip>
            </Route>
            <Route>
              <Tooltip title="mentions légales" aria-label="mentions-légales" placement="top">
                <Link component={RouterLink} to="/mentions-legales" className={classes.footerLink}>
                  Mentions Légales
                </Link>
              </Tooltip>
            </Route>
            <Route>
              <Tooltip title="contact" aria-label="contact" placement="top">
                <Link component={RouterLink} to="/contact" className={classes.footerLink}>
                  Contact
                </Link>
              </Tooltip>
            </Route>
          </Typography>
        </Toolbar>
        <Typography variant="body2" color="textSecondary" align="center" className={classes.footerCopyright}>
          {'o\'Local © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </div>
  );
};

// == Export
export default Footer;
