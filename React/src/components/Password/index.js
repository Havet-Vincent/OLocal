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
import passwordStyles from './passwordStyles';

// == Composant
const Password = ({
  password,
  confirmPassword,
  setFieldValue,
  pwdCheckError,
  setPwdCheckError,
  checkPasswordConfirmation,
  passwordLength,
  passwordConfirmed,
  handleFocus,
  style,
  fullwidth,
  variante,
  labelShrink,
  disabledField,
}) => {
  const classes = passwordStyles();
  const [showPassword, setShowPassword] = useState(false);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // ============= Password Check Display ==========
  const [errorPwdMsg, setPwdErrorMsg] = useState('');

  const handlePwdErrors = () => {
    if (!passwordConfirmed) {
      if (passwordLength === 0) {
        return setPwdCheckError(false);
      }
      if (passwordLength < 8) {
        setPwdCheckError(true);
        return setPwdErrorMsg('Le mot de passe doit contenir au minimum 8 caractères');
      }
      setPwdCheckError(true);
      return setPwdErrorMsg('Les mots de passe saisis ne sont pas identiques');
    }
    return [setPwdCheckError(false), setPwdErrorMsg('')];
  };

  useEffect(() => {
    checkPasswordConfirmation();
    handlePwdErrors();
    if (!pwdCheckError && passwordConfirmed) {
      setPwdCheckError(false);
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
    } : (labelShrink
      ? {
        className: classes.inputLabelField,
        shrink: labelShrink,
      } : {
        className: classes.inputLabelField,
      });

  return (
    <>
      <TextField
        id="password"
        label="Mot de passe (minimum 8 caractères)"
        className={style}
        name="password"
        type={showPassword ? 'text' : 'password'}
        required
        disabled={disabledField}
        fullWidth={fullwidth}
        autoComplete="current-password"
        margin="dense"
        variant={variante}
        InputLabelProps={InputLabelProps}
        value={password}
        onFocus={handleFocus}
        onChange={handleChange}
        error={pwdCheckError}
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
        className={style}
        name="confirmPassword"
        type={showPassword ? 'text' : 'password'}
        required
        disabled={disabledField}
        fullWidth={fullwidth}
        autoComplete="current-password"
        margin="dense"
        variant={variante}
        InputLabelProps={InputLabelProps}
        value={confirmPassword}
        onChange={handleChange}
        error={pwdCheckError}
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

Password.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  pwdCheckError: PropTypes.bool.isRequired,
  setPwdCheckError: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  checkPasswordConfirmation: PropTypes.func.isRequired,
  passwordLength: PropTypes.number.isRequired,
  passwordConfirmed: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func,
  style: PropTypes.string,
  fullwidth: PropTypes.bool,
  variante: PropTypes.string,
  labelShrink: PropTypes.bool,
  disabledField: PropTypes.bool,
};

Password.defaultProps = {
  handleFocus: null,
  style: null,
  fullwidth: false,
  variante: 'standard',
  labelShrink: false,
  disabledField: false,
};

// == Export
export default Password;
