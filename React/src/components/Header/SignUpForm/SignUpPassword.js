// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// == Import styles
import signUpFormStyles from './signUpFormStyles';

// == Composant
const SignUpPassword = ({
  password,
  confirmPassword,
  setFieldValue,
  checkPasswordConfirmation,
  passwordLength,
  passwordConfirmed,
  handleFocus,
  setError,
}) => {
  const classes = signUpFormStyles();
  const [showPassword, setShowPassword] = useState(false);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // ============= Password Check Display ==========
  const [pwdError, setPwdError] = useState(false);
  const [errorPwdMsg, setPwdErrorMsg] = useState('');

  // Min eight characters, at least one uppercase letter, one lowercase letter and one number:
  const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

  const handlePwdErrors = () => {
    if (!validatePassword) {
      if (passwordLength === 0) {
        return setPwdError(false);
      }
      setPwdError(true);
      return setPwdErrorMsg('Minimum requis : 8 caractères / 1 Majuscule / 1 chiffre ');
    }
    if (!passwordConfirmed) {
      setPwdError(true);
      return setPwdErrorMsg('Les mots de passe saisis ne sont pas identiques');
    }
    return [setPwdError(false), setPwdErrorMsg('')];
  };

  useEffect(() => {
    checkPasswordConfirmation();
    handlePwdErrors();
    if (!pwdError && passwordConfirmed) {
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

  // eslint-disable-next-line no-nested-ternary
  const InputLabelProps = fullScreen
    ? {
      className: classes.inputLabelField,
      shrink: fullScreen,
    } : {
      className: classes.inputLabelField,
    };

  return (
    <>
      <TextField
        id="password"
        label="Mot de passe"
        className={classes.textField}
        name="password"
        type={showPassword ? 'text' : 'password'}
        required
        fullWidth
        autoComplete="current-password"
        margin="dense"
        InputLabelProps={InputLabelProps}
        value={password}
        onFocus={handleFocus}
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
        fullWidth
        autoComplete="current-password"
        margin="dense"
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
    </>
  );
};

SignUpPassword.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  checkPasswordConfirmation: PropTypes.func.isRequired,
  passwordLength: PropTypes.number.isRequired,
  passwordConfirmed: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

// == Export
export default SignUpPassword;
