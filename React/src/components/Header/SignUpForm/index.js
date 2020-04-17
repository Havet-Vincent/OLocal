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
import signUpFormStyles from './signUpFormStyles';

// Transition Dialog effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// == Composant
const SignUpForm = ({
  setSignUp,
  siret,
  region,
  email,
  password,
  confirmPassword,
  setFieldValue,
  checkPasswordConfirmation,
  passwordLength,
  passwordConfirmed,
  handleSignupSubmit,
}) => {
  const classes = signUpFormStyles();

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (evt) => {
    setFieldValue(evt.target.name, evt.target.value);
  };

  const handleCheck = (evt) => {
    handleChange(evt);
    checkPasswordConfirmation();
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    handleSignupSubmit();
  };

  return (
    <>
      <MuiDialog
        open={true}
        fullScreen={fullScreen}
        fullWidth
        maxWidth='sm'
        TransitionComponent={Transition}
      >
        <DialogTitle className={classes.formTitle}>
          Inscrivez vous
          <IconButton color="primary" className={classes.closeButton} onClick={setSignUp}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Merci de renseigner le formulaire ci-dessous afin de créer votre compte
          </DialogContentText>
          <form onSubmit={handlesubmit}>
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
              fullWidth
              InputLabelProps={{
                className: classes.inputLabelField,
              }}
              value={email}
              onChange={handleChange}
            />
            <TextField
              id="siret"
              label="Numéro de SIRET de l'entreprise"
              className={classes.textField}
              name='siret'
              required
              margin="dense"
              fullWidth
              InputLabelProps={{
                className: classes.inputLabelField,
              }}
              value={siret}
              onChange={handleChange}
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
              fullWidth
              InputLabelProps={{
                className: classes.inputLabelField,
              }}
              value={password}
              onChange={handleCheck}
            />
            <TextField
              id="confirm-password"
              label="Confirmez le mot de passe"
              className={classes.textField}
              name='confirmPassword'
              type="password"
              required
              autoComplete="current-password"
              margin="dense"
              fullWidth
              InputLabelProps={{
                className: classes.inputLabelField,
              }}
              value={confirmPassword}
              onChange={handleCheck}
              // Password confirmation check
              error={(!passwordConfirmed & passwordLength >= 1) && true}
              helperText={!passwordConfirmed && 'Les mots de passe saisis ne sont pas identiques'}
            />
            <DialogActions>
              <Button
                className={classes.sendButton}
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                type="submit"
                disabled={!passwordConfirmed && true}
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
export default SignUpForm;
