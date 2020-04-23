import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

// == Import styles
import navbarShopkeeperProfilStyles from './navbarShopkeeperProfilStyles';

// == Composant
const NavbarShopkeeperProfil = ({
  activePage,
  setActivePage,
  getProfil,
  getProfilPage,
}) => {
  const classes = navbarShopkeeperProfilStyles();

  const handleChange = (event, newValue) => {
    setActivePage(newValue);
  };

  return (
    <Paper elevation={0} className={classes.navbarShopkeeber}>
      <IconButton edge="start" className={classes.navbarShopkeeberHome} color="primary" component={RouterLink} to="/">
        <HomeRoundedIcon fontSize="large" color="action" />
      </IconButton>
      <BottomNavigation
        value={activePage}
        onChange={handleChange}
        showLabels
        className={classes.navbarButtonContainer}
      >
        <BottomNavigationAction
          classes={{
            root: classes.navbarButton,
            selected: classes.navbarButtonSelected,
          }}
          value="Informations"
          label="Informations"
          onClick={getProfil}
        />
        <BottomNavigationAction
          classes={{
            root: classes.navbarButton,
            selected: classes.navbarButtonSelected,
          }}
          value="Ma Page"
          label="Ma Page"
          onClick={getProfilPage}
        />
      </BottomNavigation>
    </Paper>
  );
};

NavbarShopkeeperProfil.propTypes = {
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  getProfil: PropTypes.func.isRequired,
  getProfilPage: PropTypes.func.isRequired,
};

// == Export
export default NavbarShopkeeperProfil;
