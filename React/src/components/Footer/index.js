// == Import npm
import React from 'react';
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
    backgroundColor: 'rgba(247, 249, 250, .8)',
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
      color: '#f0f',
    },
  },

}));


// == Composant
const Footer = () => {
  const classes = useStyles();
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
