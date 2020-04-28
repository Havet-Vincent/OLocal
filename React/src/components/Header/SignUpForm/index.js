// == Import validators
import { verifySiret, validateEmail } from 'src/utils/validators';

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
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Icon,
  Button,
  Slide,
  useMediaQuery,
  LinearProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SignUpPassword from 'src/containers/Header/SignUpForm/SignUpPassword';

// == Import styles
import signUpFormStyles from './signUpFormStyles';

// Transition Dialog effect
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

// == Composant
const SignUpForm = ({
  loaderCheckRegister,
  setSignUp,
  getRegionsData,
  siret,
  regions,
  email,
  passwordConfirmed,
  setFieldValue,
  handleSignUpSubmit,
}) => {
  const classes = signUpFormStyles();
  const [error, setError] = useState(true);
  const [emailError, setEmailError] = useState({ error: false, helperText: '' });
  const [regionError, setRegionError] = useState({ error: false, helperText: '' });
  const [regionFocus, setRegionFocus] = useState(false);
  const [regionSelect, setRegionSelect] = useState('');
  const [siretError, setSiretError] = useState({ error: false, helperText: '' });

  useEffect(() => {
    getRegionsData();
  }, []);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // Check Errors else display Send Button
  useEffect(() => {
    // eslint-disable-next-line max-len
    if (regionFocus && !regionError.error && validateEmail(email) && verifySiret(siret) && passwordConfirmed) {
      setError(false);
    }
    else {
      setError(true);
    }
  });

  const handleFocus = () => {
    setRegionFocus(true);
    if (regionSelect === '') {
      setRegionError({ error: true, helperText: 'Selectionnez une région' });
    }
  };

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
    // Verif email field
    if (event.target.name === 'email') {
      const validEmail = validateEmail(event.target.value);
      if (!validEmail) {
        setEmailError({
          error: true,
          helperText: 'L\'email n\'est pas valide',
        });
        return;
      }
      setEmailError({ error: false, helperText: '' });
    }
    // Verif SIRET field
    if (event.target.name === 'siret') {
      const verifiedSiret = verifySiret(event.target.value);
      if (!verifiedSiret) {
        setSiretError({
          error: true,
          helperText: 'Le siret n\'est pas valide',
        });
        return;
      }
      setSiretError({ error: false, helperText: 'Siret valide' });
    }
  };

  const handleChangeRegion = (event) => {
    setRegionSelect(event.target.value);
    const region = regions.find((reg) => reg.id === event.target.value);
    setFieldValue(event.target.name, region.id);
    setRegionError({ error: false, helperText: '' });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    handleSignUpSubmit();
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
            Veuillez renseigner le formulaire ci-dessous afin de créer votre compte
          </DialogContentText>
          <form onSubmit={handlesubmit}>
            <TextField
              autoFocus
              error={emailError.error}
              id="email"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              required
              autoComplete="email"
              margin="dense"
              fullWidth
              InputLabelProps={InputLabelProps}
              value={email}
              onChange={handleChange}
              helperText={emailError.helperText}
            />
            <TextField
              error={siretError.error}
              id="siret"
              label="Numéro de SIRET de l'entreprise"
              className={classes.textField}
              name="siret"
              required
              margin="dense"
              fullWidth
              InputLabelProps={InputLabelProps}
              value={siret}
              onChange={handleChange}
              helperText={siretError.helperText}
            />
            <FormControl required className={classes.formControl} error={regionError.error}>
              <InputLabel
                id="search-region"
                {...InputLabelProps}
              >
                Région
              </InputLabel>
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
              <FormHelperText>{regionError.helperText}</FormHelperText>
            </FormControl>
            <SignUpPassword
              handleFocus={handleFocus}
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
          {loaderCheckRegister && (
            <LinearProgress color="primary" className={classes.progress} />
          )}
        </DialogContent>
      </MuiDialog>
    </>
  );
};

SignUpForm.propTypes = {
  loaderCheckRegister: PropTypes.bool.isRequired,
  passwordConfirmed: PropTypes.bool.isRequired,
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
  setFieldValue: PropTypes.func.isRequired,
  handleSignUpSubmit: PropTypes.func.isRequired,
};

// == Export
export default SignUpForm;
