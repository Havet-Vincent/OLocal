import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import { Paper, Button } from '@material-ui/core';

// == Import styles
import navbarShopkeeperProfilStyles from './navbarShopkeeperProfilStyles';

// == Composant
const NavbarShopkeeperProfil = ({ getProfil, getProfilPage }) => {
  const classes = navbarShopkeeperProfilStyles();

  return (
    <Paper square>
      <Button
        variant="outlined"
        color="primary"
        className={classes.margin}
        component={RouterLink}
        to=""
        onClick={getProfil}
      >
        Informations
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.margin}
        component={RouterLink}
        to=""
        onClick={getProfilPage}
      >
        Ma Page
      </Button>
    </Paper>
  );
};

NavbarShopkeeperProfil.propTypes = {
  getProfil: PropTypes.func.isRequired,
  getProfilPage: PropTypes.func.isRequired,
};

// == Export
export default NavbarShopkeeperProfil;
