import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  CardMedia,
  Paper,
} from '@material-ui/core';
import BaseProfilPicture from 'src/assets/img/profil.png';
import UploadPictureB64 from './UploadPictureB64';

// == Import styles
import shopkeeperProfilImageStyles from './shopkeeperProfilImageStyles';

// == Import API config for pictures base URL
const server = require('src/api.config.json');

// == Composant
const ShopkeeperProfilImage = ({ logoPicture }) => {
  const classes = shopkeeperProfilImageStyles();
  // state
  const [picture, setPicture] = useState(BaseProfilPicture);

  // First render
  useEffect(() => {
    if (logoPicture) {
      setPicture(`${server.url}:${server.port}${logoPicture}`);
    }
  }, []);

  return (
    <Paper elevation={2}>
      <CardMedia
        component="img"
        className={classes.cardMedia}
        image={picture}
        title="Image du commerce"
      >
        <UploadPictureB64
          setPicture={(file) => setPicture(file.base64)}
          setError={(error) => console.log(error)}
        />
      </CardMedia>
    </Paper>
  );
};

ShopkeeperProfilImage.propTypes = {
  logoPicture: PropTypes.string,
};

ShopkeeperProfilImage.defaultProps = {
  logoPicture: null,
};

// == Export
export default ShopkeeperProfilImage;
