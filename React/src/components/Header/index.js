// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import Logo from 'src/assets/img/logo.svg';
import { Link, AppBar, Toolbar } from '@material-ui/core';
import SignUpForm from 'src/containers/Header/SignUpForm';
import SignInForm from 'src/containers/Header/SignInForm';
import AuthMenu from 'src/containers/Header/AuthMenu';
import NavMenu from './NavMenu';


// == Import styles
import headerStyles from './headerStyles';

// == Composant
const Header = ({
  signUp,
  setSignUp,
  signIn,
  setSignIn,
  UserAuth,
}) => {
  const classes = headerStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.navbar} color="transparent">
        <Toolbar>
          <div className={classes.title}>
            <Link component={RouterLink} to="/">
              <img className={classes.logo} src={Logo} alt="O'local Logo" />
            </Link>
          </div>
          {!UserAuth && (
            <NavMenu
              setSignUp={setSignUp}
              setSignIn={setSignIn}
            />
          )}
          {signUp && (
            <SignUpForm setSignUp={setSignUp} />
          )}
          {signIn && (
            <SignInForm setSignIn={setSignIn} />
          )}
          {UserAuth && (
            <AuthMenu />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

Header.propTypes = {
  signUp: PropTypes.bool.isRequired,
  setSignUp: PropTypes.func.isRequired,
  signIn: PropTypes.bool.isRequired,
  setSignIn: PropTypes.func.isRequired,
  UserAuth: PropTypes.bool.isRequired,
};

// == Export
export default Header;
