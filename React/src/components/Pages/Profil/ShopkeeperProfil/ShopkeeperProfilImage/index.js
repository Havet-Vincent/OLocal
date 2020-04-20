import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import { CardMedia, Paper, IconButton, Box } from '@material-ui/core';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

// datas for the tests
import shopkeeper from 'src/dataShop';

// == Import assets & styles
import shopkeeperProfilImageStyles from './shopkeeperProfilImageStyles';

// == Import API server config
const server = require('src/api.config.json');

// == Composant
const ShopkeeperProfilImage = () => {
  const classes = shopkeeperProfilImageStyles();

  const [logoPicture, setLogoPicture] = useState();

  return (
    <Paper>
      <Box className={classes.shopkeepersListNav}>
        <IconButton color="primary" component={RouterLink} to="/">
          <HomeRoundedIcon fontSize="large" color="action" />
        </IconButton>
      </Box>
      <CardMedia
        className={classes.cardMedia}
        image={`${server.url}:${server.port}${shopkeeper.logoPicture}`}
        title="commerce"
      />
    </Paper>
  );

};

// == Export
export default ShopkeeperProfilImage;

