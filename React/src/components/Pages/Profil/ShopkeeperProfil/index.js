import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Grid,
  TextField,
  Container,
  Paper,
  Box,
  FormControl,
  InputAdornment,
  Typography,
  Fab,
  TextareaAutosize,
  useMediaQuery,
  Link,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Loader from 'src/components/Loader';
import Password from 'src/containers/Password';
import ShopkeeperProfilImage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilImage';
import NavbarShopkeeperProfil from './NavbarShopkeeperProfil';
import DeleteAccountAlert from '../DeleteAccountAlert';


// == Import styles
import shopkeeperProfilStyles from './shopkeeperProfilStyles';

// == Composant
const ShopkeeperProfil = ({
  loader,
  userData,
  getUserData,
  setFieldValue,
  fieldError,
  setFieldError,
  handleUpdateUserData,
  handleDeleteUserAccount,
  logoPicture,
  setLogoPicture,
  setLogoPictureError,
  pwdCheckError,
}) => {
  const classes = shopkeeperProfilStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  // Responsive mobile
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // First render => fetch User data
  useEffect(() => {
    getUserData();
  }, []);

  // Disable update data button if errors
  useEffect(() => {
    if (pwdCheckError) {
      setError(true);
      setFieldError(false);
    }
    if (!fieldError) {
      setError(false);
    }
  });

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
  };

  const setPicture = (picture) => {
    setError(false);
    setLogoPicture(picture);
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
      <Loader loader={loader} />
      {!loader && (
        <Grid container className={classes.shopkeeperProfilWrapper}>
          <Container className={classes.shopkeeperProfilContent} component="main">
            <NavbarShopkeeperProfil />
            <Typography className={classes.shopkeeperProfilTitle} variant="h4" component="h1" align="center">
              {userData.companyName}
            </Typography>
            <Paper className={classes.shopkeeperProfilContainer} elevation={0}>
              <Box className={classes.shopkeeperProfilPicture}>
                <Box>
                  <ShopkeeperProfilImage
                    logoPicture={logoPicture}
                    setPicture={setPicture}
                    setError={setLogoPictureError}
                  />
                </Box>
                <Paper variant="outlined" className={classes.shopkeeperProfilInfos} elevation={3}>
                  <Typography variant="h6" component="h5" className={classes.shopkeeperProfilInfosTitle} gutterBottom>
                    Informations personnelles
                  </Typography>
                  <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    fullWidth
                    InputLabelProps={{ ...InputLabelProps, shrink: true }}
                    value={userData.email}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><EditRoundedIcon /></InputAdornment>,
                    }}
                  />
                  <Box className={classes.passwordForm}>
                    <Link
                      component="button"
                      variant="body2"
                      underline="always"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      { showPassword ? 'Verrouiller les champs Mot de Passe' : 'Modifier votre mot de passe'}
                    </Link>
                    <Password
                      style={classes.passwordField}
                      variante="outlined"
                      fullwidth
                      labelShrink
                      disabledField={!showPassword}
                    />
                  </Box>
                </Paper>
              </Box>
              <Box className={classes.shopkeeperProfilDescription}>
                <Box>
                  <Typography variant="h6" component="h4" gutterBottom>
                    SIRET : {userData.siret}
                  </Typography>
                  <Typography variant="subtitle2" component="p" className={classes.shopkeeperProfilAddress}>
                    <RoomRoundedIcon />
                    {`
                        ${userData.wayNumber ? userData.wayNumber : ''}
                        ${userData.repeatIndex ? userData.repeatIndex : ''}
                        ${userData.wayName ? userData.wayName : ''}
                        ${userData.additionalAddress ? `- ${userData.additionalAddress}` : ''}
                        ${userData.postalCode ? `- ${userData.postalCode}` : ''}
                        ${userData.city ? userData.city.toUpperCase() : ''}
                      `}
                  </Typography>
                </Box>
                <FormControl className={classes.shopkeeperProfilCoordonates}>
                  <Box className={classes.shopkeeperProfilCoordonatesWrapper}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <LanguageRoundedIcon />
                      </Grid>
                      <Grid item md={8} xs={10}>
                        <TextField
                          fullWidth
                          id="website"
                          label="Mon site web"
                          className={classes.gridField}
                          type="text"
                          name="website"
                          placeholder="Copiez ici le lien de votre site web"
                          autoComplete="website"
                          value={userData.website ? userData.website : ''}
                          onChange={handleChange}
                          margin="dense"
                          InputLabelProps={{
                            className: classes.inputLabelField,
                          }}
                          InputProps={{
                            classes: {
                              input: classes.inputGridField,
                            },
                            endAdornment: <InputAdornment position="end"><EditRoundedIcon /></InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className={classes.shopkeeperProfilCoordonatesWrapper}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PhoneRoundedIcon />
                      </Grid>
                      <Grid item md={8} xs={10}>
                        <TextField
                          id="phone"
                          label="N° de téléphone"
                          className={classes.gridField}
                          type="text"
                          name="phone"
                          autoComplete="phone"
                          value={userData.phone ? userData.phone : ''}
                          onChange={handleChange}
                          margin="dense"
                          InputLabelProps={{
                            className: classes.inputLabelField,
                          }}
                          InputProps={{
                            classes: {
                              input: classes.inputGridField,
                            },
                            endAdornment: <InputAdornment position="end"><EditRoundedIcon /></InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
                <Paper elevation={0} className={classes.shopkeeperProfilDetails}>
                  <Paper className={classes.textAreaFieldWrapper} elevation={3}>
                    <Typography variant="h6" component="h4" gutterBottom>
                      Description de votre boutique :
                    </Typography>
                    <TextareaAutosize
                      className={classes.textAreaField}
                      name="companyDescription"
                      aria-label="companyDescription"
                      rowsMin={22}
                      placeholder="Vous pouvez décrire ici votre boutique avec toutes les informations complémentaires (ex: horaires)"
                      defaultValue={userData.companyDescription}
                      onChange={handleChange}
                    />
                  </Paper>
                </Paper>
              </Box>
            </Paper>
            <Box className={classes.shopkeeperProfilValidationBtn}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="save-account"
                disabled={error}
                classes={{
                  root: classes.fab,
                  label: classes.fabLabel,
                }}
                onClick={handleUpdateUserData}
              >
                <SaveRoundedIcon className={classes.extendedIcon} />
                Enregister les modifications
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="delete-account"
                classes={{
                  root: classes.fab,
                  label: classes.fabLabel,
                }}
                onClick={() => setOpenAlert(true)}
              >
                <DeleteForeverRoundedIcon className={classes.extendedIcon} />
                Supprimer mon compte
              </Fab>
              <DeleteAccountAlert
                openAlert={openAlert}
                handleCloseAlert={() => setOpenAlert(false)}
                handleDeleteUserAccount={handleDeleteUserAccount}
              />
            </Box>
          </Container>
        </Grid>
      )}
    </>
  );
};

ShopkeeperProfil.propTypes = {
  loader: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  logoPicture: PropTypes.string.isRequired,
  getUserData: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  fieldError: PropTypes.bool.isRequired,
  setFieldError: PropTypes.func.isRequired,
  handleUpdateUserData: PropTypes.func.isRequired,
  handleDeleteUserAccount: PropTypes.func.isRequired,
  setLogoPicture: PropTypes.func.isRequired,
  setLogoPictureError: PropTypes.func.isRequired,
  pwdCheckError: PropTypes.bool.isRequired,
};

// == Export
export default ShopkeeperProfil;
