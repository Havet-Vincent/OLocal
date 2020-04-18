// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import material UI components
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Icon,
  InputAdornment,
  Button,
  Slide,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// == Import assets & styles
import signInFormStyles from './signInFormStyles';

// Transition Dialog effect
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

// == Composant
const SignInForm = ({
  setSignIn,
  email,
  password,
  confirmPassword,
  setFieldValue,
  checkPasswordConfirmation,
  passwordLength,
  passwordConfirmed,
  handleSignInSubmit,
}) => {
  const classes = signInFormStyles();
  const [error, setError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // ============= Password Check Display ==========
  const [pwdError, setPwdError] = useState(false);
  const [errorPwdMsg, setPwdErrorMsg] = useState('');

  const handlePwdErrors = () => {
    if (!passwordConfirmed) {
      if (passwordLength === 0) {
        return setPwdError(false);
      }
      if (passwordLength < 8) {
        setPwdError(true);
        return setPwdErrorMsg('Le mot de passe doit contenir au minimum 8 caractères');
      }
      setPwdError(true);
      return setPwdErrorMsg('Les mots de passe saisis ne sont pas identiques');
    }
    return [setPwdError(false), setPwdErrorMsg('')];
  };

  useEffect(() => {
    checkPasswordConfirmation();
    handlePwdErrors();
    if (email !== '' && pwdError === false && passwordConfirmed) {
      setError(false);
    }
  });
  // ========================================

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    handleSignInSubmit();
  };

  const InputLabelProps = fullScreen
    ? {
      className: classes.inputLabelField,
      shrink: fullScreen,
    } : {
      className: classes.inputLabelField,
    };

  return (
    <>
      <MuiDialog
        open
        // fullScreen={fullScreen}
        fullWidth
        maxWidth="xs"
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
              InputLabelProps={InputLabelProps}
              value={email}
              onChange={handleChange}
            />
            <TextField
              id="password"
              label="Mot de passe (minimum 8 caractères)"
              className={classes.textField}
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              margin="dense"
              variant="outlined"
              InputLabelProps={InputLabelProps}
              value={password}
              onChange={handleChange}
              error={pwdError}
              helperText={errorPwdMsg}
              InputProps={{
                endAdornment:
                // eslint-disable-next-line react/jsx-indent
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
              }}
            />
            <TextField
              id="confirm-password"
              label="Confirmez le mot de passe"
              className={classes.textField}
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              margin="dense"
              variant="outlined"
              InputLabelProps={InputLabelProps}
              value={confirmPassword}
              onChange={handleChange}
              error={pwdError}
              helperText={errorPwdMsg}
              InputProps={{
                endAdornment:
                  // eslint-disable-next-line react/jsx-indent
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
              }}
            />
            <DialogActions>
              <Button
                className={classes.sendButton}
                variant="contained"
                color="secondary"
                endIcon={<Icon>send</Icon>}
                type="submit"
                disabled={error}
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

SignInForm.propTypes = {
  setSignIn: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  checkPasswordConfirmation: PropTypes.func.isRequired,
  passwordLength: PropTypes.number.isRequired,
  passwordConfirmed: PropTypes.bool.isRequired,
  handleSignInSubmit: PropTypes.func.isRequired,
};

// == Export
export default SignInForm;
