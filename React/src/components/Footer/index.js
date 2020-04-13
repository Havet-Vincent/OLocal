// == Import npm
import React from 'react';

import {
  AppBar, Toolbar, Typography, Link,
} from '@material-ui/core';

// == Import styles
import footerStyles from './footerStyles';

// == Composant
const Footer = () => {
  const classes = footerStyles();
  const preventDefault = (event) => event.preventDefault();
  return (
    <div>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.root}>
            <Link className={classes.footerLink} href="#" onClick={preventDefault}>
              Plan du site
            </Link>
            <Link className={classes.footerLink} href="#" onClick={preventDefault}>
              Mentions Légales
            </Link>
            <Link className={classes.footerLink} href="#" onClick={preventDefault}>
              Contact
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// == Export
export default Footer;
