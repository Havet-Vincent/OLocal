/* eslint-disable max-len */
import React from 'react';
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

const DeleteAccountAlert = ({ openAlert, handleCloseAlert, handleDeleteUserAccount }) => (
  <div>
    <Dialog
      open={openAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseAlert}
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
        <Button onClick={handleCloseAlert} color="primary">
          Annuler
        </Button>
        <Button
          onClick={() => {
            handleCloseAlert();
            handleDeleteUserAccount();
          }}
          color="primary"
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

DeleteAccountAlert.propTypes = {
  openAlert: PropTypes.bool.isRequired,
  handleCloseAlert: PropTypes.func.isRequired,
  handleDeleteUserAccount: PropTypes.func.isRequired,
};

// == Export
export default DeleteAccountAlert;
