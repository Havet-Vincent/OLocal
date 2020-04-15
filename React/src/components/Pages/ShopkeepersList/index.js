// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
// import { Grid, Paper, Backdrop, CircularProgress } from '@material-ui/core';

// == Import assets & styles
import shopkeepersListStyles from './shopkeepersListStyles';

// == Composant
const ShopkeepersList = ({ searchResults }) => {
  console.log(searchResults);
  const classes = shopkeepersListStyles();

  return (
    <>
    </>
  );
};

ShopkeepersList.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      postalCode: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      companyDescription: PropTypes.string.isRequired,
      logoPicture: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

// == Export
export default ShopkeepersList;
