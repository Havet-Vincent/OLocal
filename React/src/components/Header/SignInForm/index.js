// == Import npm
import React from 'react';

// == Import material UI components
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  IconButton,
  Icon,
  Button,
  Slide,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

// == Import assets & styles
import signInFormStyles from './signInFormStyles';

// Transition Dialog effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// == Composant
const SignInForm = ({ setSignIn }) => {
  const classes = signInFormStyles();

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handlesubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <MuiDialog
        open={true}
        // fullScreen={fullScreen}
        fullWidth
        maxWidth='xs'
        TransitionComponent={Transition}
      >
        <DialogTitle className={classes.formTitle}>
          Connection
          <IconButton color="secondary" className={classes.closeButton} onClick={setSignIn}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handlesubmit} className={classes.formContent}>
            <TextField
              autoFocus
              id="email"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              required
              autoComplete="email"
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                className: classes.inputLabelField,
                shrink: fullScreen,
              }}
              //value=''
            />
            <TextField
              id="password"
              label="Mot de passe (minimum 8 caractères)"
              className={classes.textField}
              name='password'
              type="password"
              required
              autoComplete="current-password"
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                className: classes.inputLabelField,
                shrink: fullScreen,
              }}
              //value=''
            />
            <TextField
              id="confirm-password"
              label="Confirmez le mot de passe"
              className={classes.textField}
              name='confirm-password'
              type="password"
              required
              autoComplete="current-password"
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                className: classes.inputLabelField,
                shrink: fullScreen,
              }}
              //value=''
            />
            <DialogActions>
              <Button
                className={classes.sendButton}
                variant="contained"
                color="secondary"
                endIcon={<Icon>send</Icon>}
                type="submit"
              >
                Envoyer
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </MuiDialog>
    </>
  );
};

// == Export
export default SignInForm;
