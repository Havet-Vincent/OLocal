import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  CardMedia,
  Paper,
  IconButton,
  Box,
} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

// == Import styles
import shopkeeperProfilImageStyles from './shopkeeperProfilImageStyles';

// == Import API config for pictures base URL
const server = require('src/api.config.json');

// == Composant
const ShopkeeperProfilImage = ({ logoPicture }) => {
  const classes = shopkeeperProfilImageStyles();

  return (
    <Paper>
      <Box className={classes.shopkeepersListNav}>
        <IconButton color="primary" component={RouterLink} to="/">
          <HomeRoundedIcon fontSize="large" color="action" />
        </IconButton>
      </Box>
      <CardMedia
        className={classes.cardMedia}
        image={`${server.url}:${server.port}${logoPicture}`}
        title="Image du commerce"
      />
    </Paper>
  );
};

ShopkeeperProfilImage.propTypes = {
  logoPicture: PropTypes.string.isRequired,
};

// == Export
export default ShopkeeperProfilImage;
