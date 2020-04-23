/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteAccountAlert = ({ openAlert, handleDeleteUserAccount }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openAlert) {
      setOpen(true);
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleDeleteUserAccount();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Suppression du compte utilisateur</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Cette action entraîne la suppression définitive de l'ensemble de vos données personnelles. Etes vous certain de vouloir poursuivre ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteAccountAlert.propTypes = {
  openAlert: PropTypes.bool.isRequired,
  handleDeleteUserAccount: PropTypes.func.isRequired,
};

// == Export
export default DeleteAccountAlert;
