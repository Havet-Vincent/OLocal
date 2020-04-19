// == Import npm
import React from 'react';

// == Import components
import { Button, Menu, MenuItem } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// == Import styles
import authMenuStyles from './authMenuStyles';

// == Composant
const AuthMenu = ({ setLogout}) => {
  const classes = authMenuStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
        endIcon={<AccountBoxIcon viewBox="0 2 22 22" />}
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
        <MenuItem onClick={handleClose}>Mon Profil</MenuItem>
        <MenuItem color="secondary" onClick={setLogout}>Se déconnecter</MenuItem>
      </Menu>
    </div>
  );
};

// == Export
export default AuthMenu;
