// == Import npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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

// == Import styles
import signUpFormStyles from './signUpFormStyles';

// Transition Dialog effect
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

// == Composant
const SignUpForm = ({
  setSignUp,
  getRegionsData,
  siret,
  regions,
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
  const [error, setError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [regionError, setRegionError] = useState(false);
  const [regionSelect, setRegionSelect] = useState('');

  useEffect(() => {
    getRegionsData();
  }, []);

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
    if (regionError === false && email !== '' && siret !== '' && pwdError === false && passwordConfirmed) {
      setError(false);
    }
  });
  // ========================================

  const handleFocus = () => {
    if (regionSelect === '') {
      setRegionError(true);
    }
  };

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };

  const handleChangeRegion = (event) => {
    setRegionSelect(event.target.value);
    const region = regions.find((reg) => reg.id === event.target.value);
    setFieldValue(event.target.name, region.id);
    setRegionError(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    handleSignupSubmit();
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

  return (
    <>
      <MuiDialog
        open
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
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
              name="siret"
              required
              margin="dense"
              fullWidth
              InputLabelProps={{
                className: classes.inputLabelField,
              }}
              value={siret}
              onChange={handleChange}
            />
            <FormControl required className={classes.formControl} error={regionError}>
              <InputLabel id="search-region">Région</InputLabel>
              <Select
                label="Région"
                labelId="search-region"
                id="search-region"
                value={regionSelect}
                onChange={handleChangeRegion}
                inputProps={{ name: 'region' }}
                MenuProps={MenuProps}
              >
                {regions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="password"
              label="Mot de passe (minimum 8 caractères)"
              className={classes.textField}
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              margin="dense"
              fullWidth
              InputLabelProps={{
                className: classes.inputLabelField,
              }}
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
              autoComplete="current-password"
              margin="dense"
              fullWidth
              InputLabelProps={{
                className: classes.inputLabelField,
              }}
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
                color="primary"
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

SignUpForm.propTypes = {
  setSignUp: PropTypes.func.isRequired,
  getRegionsData: PropTypes.func.isRequired,
  siret: PropTypes.string.isRequired,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  checkPasswordConfirmation: PropTypes.func.isRequired,
  passwordLength: PropTypes.number.isRequired,
  passwordConfirmed: PropTypes.bool.isRequired,
  handleSignupSubmit: PropTypes.func.isRequired,
};

// == Export
export default SignUpForm;
