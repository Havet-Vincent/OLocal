// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

// == Import styles
import loaderStyles from './loaderStyles';

// == Composant
const Loader = ({ loader }) => {
  const classes = loaderStyles();

  return (
    <Backdrop className={classes.backdrop} open={loader}>
      <CircularProgress size={50} thickness={4} color="inherit" />
    </Backdrop>
  );
};

Loader.propTypes = {
  loader: PropTypes.bool.isRequired,
};

// == Export
export default Loader;
