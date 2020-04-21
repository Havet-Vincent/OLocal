// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// == Import styles
import authMenuStyles from './authMenuStyles';

// == Composant
const AuthMenu = ({ getProfil, setLogout }) => {
  const classes = authMenuStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfil = () => {
    getProfil();
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLogout();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="primary"
        size="large"
        aria-label="Mon Compte"
        aria-controls="user-menu"
        aria-haspopup="true"
        className={classes.accountButton}
        endIcon={<AccountBoxIcon fontSize="large" />}
        onClick={handleMenu}
      >
        Mon Compte
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfil}>Mon Profil</MenuItem>
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
      </Menu>
    </div>
  );
};

AuthMenu.propTypes = {
  getProfil: PropTypes.func.isRequired,
  setLogout: PropTypes.func.isRequired,
};

// == Export
export default AuthMenu;
