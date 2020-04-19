// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import { Button, Icon } from '@material-ui/core';

// == Import styles
import './navMenu.scss';

// == Composant
const NavMenu = ({ setSignUp, setSignIn }) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const buttonClasses = open ? 'menu-icon is-opened' : 'menu-icon';
  const menuClasses = open ? 'navbar-menu is-opened' : 'navbar-menu';

  return (
    <>
      <div
        className={buttonClasses}
        variant="text"
        onClick={handleToggle}
      >
        <span />
        <svg x="0" y="0" width="54px" height="54px" viewBox="0 0 54 54">
          <path
            d="M16.500,27.000 C16.500,27.000 24.939,27.000 38.500,27.000 C52.061,27.000 49.945,15.648 46.510,11.367 C41.928,5.656 34.891,2.000 27.000,2.000 C13.193,2.000 2.000,13.193 2.000,27.000 C2.000,40.807 13.193,52.000 27.000,52.000 C40.807,52.000 52.000,40.807 52.000,27.000 C52.000,13.000 40.837,2.000 27.000,2.000 "
          />
        </svg>
      </div>
      <div className={menuClasses}>
        <div className="menu-item">
          <Button
            size="small"
            color="primary"
            variant="outlined"
            fullWidth
            endIcon={<Icon>edit</Icon>}
            onClick={() => {
              setSignUp();
              handleToggle();
            }}
          >
            S'inscrire
          </Button>
        </div>
        <div className="menu-item">
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            fullWidth
            endIcon={<Icon>lock</Icon>}
            onClick={() => {
              setSignIn();
              handleToggle();
            }}
          >
            Se connecter
          </Button>
        </div>
      </div>
    </>
  );
};

NavMenu.propTypes = {
  setSignUp: PropTypes.func.isRequired,
  setSignIn: PropTypes.func.isRequired,
};

// == Export
export default NavMenu;
