import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  LinearProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// == Import styles
import shopkeeperProfilPageStyles from './shopkeeperProfilPageStyles';

// Transition Dialog effect
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

// == Composant
const LocalSupplierForm = ({
  loaderAddSupplier,
  openSupplierForm,
  handleCloseSupplierForm,
  supplierRegion,
  regions,
  siret,
  setFieldValue,
  handleAddLocalSupplier,
}) => {
  const classes = shopkeeperProfilPageStyles();
  const [error, setError] = useState(true);
  const [regionError, setRegionError] = useState(false);
  const [regionSelect, setRegionSelect] = useState(regions[0].id);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // Check Errors else display Send Button
  useEffect(() => {
    if (!regionError && siret !== '') {
      setError(false);
    }
    else {
      setError(true);
    }
  });

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };

  const handleChangeRegion = (event) => {
    setRegionSelect(event.target.value);
    const region = regions.find((reg) => reg.id === event.target.value);
    setFieldValue(event.target.name, region.id);
    setRegionError(false);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        // sub-menu size
        maxHeight: 300,
        maxWidth: 320,
      },
    },
  };

  const InputLabelProps = fullScreen
    ? {
      className: classes.inputLabelField,
      shrink: fullScreen,
    } : {
      className: classes.inputLabelField,
    };

  return (
    <div>
      <Dialog
        open={openSupplierForm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseSupplierForm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.formTitle} id="alert-dialog-slide-title">Ajouter un producteur</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Entrer le N° de siret du producteur ainsi que sa région
          </DialogContentText>
          <form>
            <TextField
              autoFocus
              required
              className={classes.textField}
              margin="dense"
              id="siret"
              label="N° de siret"
              fullWidth
              name="siret"
              value={siret}
              InputLabelProps={InputLabelProps}
              onChange={handleChange}
            />
            <FormControl required className={classes.formControl} error={regionError}>
              <InputLabel id="supplierRegion" {...InputLabelProps}>Région</InputLabel>
              <Select
                fullWidth
                className={classes.searchSelect}
                label="Région du Producteur"
                labelId="supplierRegion"
                id="supplierRegion"
                inputProps={{ name: 'supplierRegion' }}
                value={!supplierRegion ? regionSelect : supplierRegion}
                onChange={handleChangeRegion}
                MenuProps={MenuProps}
              >
                {regions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          {loaderAddSupplier && (
            <LinearProgress color="primary" className={classes.progress} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSupplierForm} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={handleAddLocalSupplier}
            color="primary"
            disabled={error}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LocalSupplierForm.propTypes = {
  loaderAddSupplier: PropTypes.bool.isRequired,
  openSupplierForm: PropTypes.bool.isRequired,
  handleCloseSupplierForm: PropTypes.func.isRequired,
  supplierRegion: PropTypes.number.isRequired,
  regions: PropTypes.array.isRequired,
  siret: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleAddLocalSupplier: PropTypes.func.isRequired,
};

// == Export
export default LocalSupplierForm;
