// == Import npm
import React from 'react';

import { Route, Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Link,
} from '@material-ui/core';

// == Import
const useStyles = makeStyles((theme) => ({

  appBar: {
    top: 'auto',
    bottom: 0,
    width: '100%',
    color: 'black',
    backgroundColor: 'rgba(247, 249, 250, .6)',
  },

  toolBar: {
    justifyContent: 'center',
  },

  root: {
    '& > * + *': {
      marginLeft: theme.spacing(4),
    },
  },

  footerLink: {
    color: 'black',
    '&:hover': {
      color: '#26a69a',
    },
  },

}));


// == Composant
const Footer = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.root}>
            <Route>
              <Link component={RouterLink} to="/plan du site" className={classes.footerLink}>
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
