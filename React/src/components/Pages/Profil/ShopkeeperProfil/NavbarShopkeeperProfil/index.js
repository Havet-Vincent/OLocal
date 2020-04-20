import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Button } from '@material-ui/core';

// == Import assets & styles
import navbarShopkeeperProfilStyles from './navbarShopkeeperProfilStyles';

// == Composant
const NavbarShopkeeperProfil = () => {
  const classes = navbarShopkeeperProfilStyles();

  return (
    <Paper square>
    <Button variant="outlined" color="primary" className={classes.margin} component={RouterLink} to="/commercant/profil/informations" > 
            Information  
      </Button>
      <Button variant="outlined" color="primary" className={classes.margin} component={RouterLink} to="/commercant/profil/page" > 
            Page
      </Button>  
    </Paper>
  );
};

// == Export
export default NavbarShopkeeperProfil;
