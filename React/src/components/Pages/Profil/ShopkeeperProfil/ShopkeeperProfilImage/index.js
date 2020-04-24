import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  CardMedia,
  Paper,
} from '@material-ui/core';
import UploadPictureB64 from '../../UploadPictureB64';

// == Import styles
import shopkeeperProfilImageStyles from './shopkeeperProfilImageStyles';

// == Composant
const ShopkeeperProfilImage = ({ logoPicture, setPicture, setError }) => {
  const classes = shopkeeperProfilImageStyles();

  return (
    <Paper elevation={2}>
      <CardMedia
        className={classes.cardMedia}
        image={logoPicture}
        title="Image du commerce"
      >
        <UploadPictureB64
          setPicture={(file) => setPicture(file.base64)}
          setError={(error) => setError(error)}
        />
      </CardMedia>
    </Paper>
  );
};

ShopkeeperProfilImage.propTypes = {
  logoPicture: PropTypes.string,
  setPicture: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

ShopkeeperProfilImage.defaultProps = {
  logoPicture: null,
};

// == Export
export default ShopkeeperProfilImage;
