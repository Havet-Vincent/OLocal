// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
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
import Password from 'src/containers/Password';

// == Import styles
import signInFormStyles from './signInFormStyles';

// Transition Dialog effect
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

// == Composant
const SignInForm = ({
  setSignIn,
  email,
  setFieldValue,
  handleSignInSubmit,
}) => {
  const classes = signInFormStyles();
  const [error, setError] = useState(true);
  const [pwdError, setPwdError] = useState(false);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // Check Errors else display Send Button
  useEffect(() => {
    if (email !== '' && !pwdError) {
      setError(false);
    }
  });

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
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
        fullScreen={fullScreen}
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
            <Password
              setError={(value) => setPwdError(value)}
              style={classes.textField}
              variante="outlined"
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
  setFieldValue: PropTypes.func.isRequired,
  handleSignInSubmit: PropTypes.func.isRequired,
};

// == Export
export default SignInForm;
