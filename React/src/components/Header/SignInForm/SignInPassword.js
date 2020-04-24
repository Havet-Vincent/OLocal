// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// == Import styles
import signInFormStyles from './signInFormStyles';

// == Composant
const SignInPassword = ({
  password,
  passwordLength,
  setFieldValue,
  setError,
}) => {
  const classes = signInFormStyles();
  const [showPassword, setShowPassword] = useState(false);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // ============= Password Check Display ==========
  const [focus, setFocus] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [errorPwdMsg, setPwdErrorMsg] = useState('');

  // Min eight characters, at least one uppercase letter, one lowercase letter and one number:
  const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

  const handlePwdErrors = () => {
    if (!validatePassword) {
      if (passwordLength === 0 && !focus) {
        if (focus) {
          return setPwdError(true);
        }
        return setPwdError(false);
      }
      setPwdError(true);
      return setPwdErrorMsg('Minimum requis : 8 caractères / 1 Majuscule / 1 chiffre ');
    }
    setError(false);
    return [setPwdError(false), setPwdErrorMsg('')];
  };

  useEffect(() => {
    handlePwdErrors();
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
        variant="outlined"
        autoComplete="current-password"
        margin="dense"
        InputLabelProps={InputLabelProps}
        value={password}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
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
      <Button href="" disabled className={classes.lostLink}>
        Mot de Passe oublié ?
      </Button>
    </>
  );
};

SignInPassword.propTypes = {
  password: PropTypes.string.isRequired,
  passwordLength: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

// == Export
export default SignInPassword;
