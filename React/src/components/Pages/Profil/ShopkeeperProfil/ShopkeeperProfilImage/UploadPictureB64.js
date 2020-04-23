/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';


const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
  fab: {
    opacity: 0.8,
    backgroundColor: 'rgba(55, 71, 79, .8)',
    position: 'relative',
  },
  fabLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F7F9FA',
    fontSize: '.92em',
    fontWeight: 500,
    paddingLeft: 8,
    paddingRight: 8,
  },
  extendedIcon: {
    color: '#F7F9FA',
    fontSize: 32,
    marginRight: '5px',
  },
}));

// == Composant
const UploadPictureB64 = ({ setPicture, setError }) => {
  const classes = useStyles();

  const checkFileProperties = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      setError('Vous ne pouvez charger que des fichiers de type .JPG ou .PNG');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setError('La taille de du fichier ne doit pas excéder 2MB');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (e) => {
    // get the file
    const file = e.target.files[0];
    // control the file properties
    const fileCheck = checkFileProperties(file);
    if (fileCheck) {
      // Make new FileReader
      const reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: `${Math.round(file.size / 1000)} kB`,
          base64: reader.result,
          file,
        };
        // Push it to the state
        setPicture(fileInfo);
      };
    }
  };

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        type="file"
        id="upload-file"
        onChange={handleChange}
      />
      <label htmlFor="upload-file">
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="upload-picture"
          component="span"
          classes={{
            root: classes.fab,
            label: classes.fabLabel,
          }}
        >
          <ImageRoundedIcon className={classes.extendedIcon} />
          Modifier l'image
        </Fab>
      </label>
    </>
  );
};

UploadPictureB64.propTypes = {
  setPicture: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

// == Export
export default UploadPictureB64;
