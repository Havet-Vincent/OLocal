// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Button,
  Menu,
  MenuItem,
  Icon,
} from '@material-ui/core';

// == Import styles
import authMenuStyles from './authMenuStyles';

// == Composant
const AuthMenu = ({ userRole, getProfil, setLogout }) => {
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
        endIcon={<Icon style={{ fontSize: 32 }} className={classes.accountIcon}>person</Icon>}
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
        {userRole === 'ROLE_ADMIN' ? (
          <MenuItem>
            <a href={`${process.env.URL_API}/admin`} target="_blank" rel="noopener noreferrer">
              Accès BackOffice Administration
            </a>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleProfil}>
            Mon Profil
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
      </Menu>
    </div>
  );
};

AuthMenu.propTypes = {
  getProfil: PropTypes.func.isRequired,
  setLogout: PropTypes.func.isRequired,
  userRole: PropTypes.string,
};

AuthMenu.defaultProps = {
  userRole: null,
};

// == Export
export default AuthMenu;
