// == Import npm
import React from 'react';

// == Import material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';

// == Import assets & styles
import Logo from '../../assets/img/logo.png';
import headerStyles from './headerStyles';

// == Composant
const Header = () => {
  const classes = headerStyles();

  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <div className={classes.title}>
            <img className={classes.logo} src={Logo} alt="olocal logo" />
          </div>
          {!auth && (
            <>
              <Button size="small" color="primary" variant="outlined" endIcon={<Icon>edit</Icon>} className={classes.signinButton} href="#!">S'inscrire</Button>
              <Button size="small" color="secondary" variant="outlined" endIcon={<Icon>lock</Icon>} className={classes.signupButton}>Se connecter</Button>
            </>
          )}
          {auth && (
            <div>
              <AccountBoxIcon
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary"
                fontSize="large"
              />
              <Menu
                id="menu-appbar"
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
                <MenuItem onClick={handleClose}>Mon profil</MenuItem>
                <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

// == Export
export default Header;
