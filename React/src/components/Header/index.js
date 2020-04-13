// == Import npm
import React from 'react';

// == Import material UI components
import { Link, AppBar, Toolbar } from '@material-ui/core';
import NavMenu from './NavMenu';
import AuthMenu from './AuthMenu';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

// == Import assets & styles
import Logo from '../../assets/img/logo.svg';
import headerStyles from './headerStyles';

// == Composant
const Header = () => {
  const classes = headerStyles();

  // temp state
  const [auth, setAuth] = React.useState(false);

  // state 
  const [signUp, setSignUp] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);

  const setLogout = () => {
    setAuth(false);
  };

  return (
    <>
      <AppBar className={classes.navbar} color='transparent'>
        <Toolbar>
          <div className={classes.title}>
            <Link href="/">
              <img className={classes.logo} src={Logo} alt="O'local Logo" />
            </Link>
          </div>
          {!auth && (
            <NavMenu 
              setSignUp={() => setSignUp(true)} 
              setSignIn={() => setSignIn(true)} 
            />
          )}
          {signUp && (
            <SignUpForm setSignUp={() => setSignUp(false)} />
          )}
          {signIn && (
            <SignInForm setSignIn={() => setSignIn(false)} />
          )}
          {auth && (
            <AuthMenu setLogout={setLogout} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

// == Export
export default Header;
