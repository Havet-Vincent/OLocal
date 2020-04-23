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
  Button,
  Slide,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Password from 'src/containers/Password';

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
  setFieldValue,
  handleSignupSubmit,
}) => {
  const classes = signUpFormStyles();
  const [error, setError] = useState(true);
  const [pwdError, setPwdError] = useState(false);
  const [regionError, setRegionError] = useState(false);
  const [regionSelect, setRegionSelect] = useState('');

  useEffect(() => {
    getRegionsData();
  }, []);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // Check Errors else display Send Button
  useEffect(() => {
    if (!regionError && email !== '' && siret !== '' && !pwdError) {
      setError(false);
    }
  });

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
              InputLabelProps={InputLabelProps}
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
              InputLabelProps={InputLabelProps}
              value={siret}
              onChange={handleChange}
            />
            <FormControl required className={classes.formControl} error={regionError}>
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
            </FormControl>
            <Password
              setError={(value) => setPwdError(value)}
              handleFocus={handleFocus}
              style={classes.textField}
              fullwidth
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
  setFieldValue: PropTypes.func.isRequired,
  handleSignupSubmit: PropTypes.func.isRequired,
};

// == Export
export default SignUpForm;
