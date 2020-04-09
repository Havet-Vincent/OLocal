// == Import npm
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';

// == Import
import Logo from '../../assets/img/logo.png';
import './header.scss';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: 'rgba(247, 249, 250, .8)',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '120px',
    height: 'auto',
  },
  signupButton: {
    fontSize: '.8em',
    border: '2px solid',
    fontWeight: '700',
    marginLeft: '10px',
    '&:hover': {
      color: '#F7F9FA',
      backgroundColor: '#44C868',
      border: '2px solid #44C868',
    },
  },
  signinButton: {
    fontSize: '.8em',
    border: '2px solid',
    fontWeight: '700',
    marginLeft: '10px',
    '&:hover': {
      color: '#F7F9FA',
      backgroundColor: '#1EA4E9',
      border: '2px solid #1EA4E9',
    },
    profileIcon: {
      height: '3em',
    },
  },
}));

// == Composant
const Header = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
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
    <div className={classes.root}>
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
              >
                <AccountCircle />
              </AccountBoxIcon>
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
    </div>
  );
};

// == Export
export default Header;
