import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  TextField,
  Container,
  Paper,
  Box,
  Typography,
  Button,
  TextareaAutosize,
} from '@material-ui/core';
import Loader from 'src/components/Loader';
import UploadAvatar from 'src/components/Pages/Profil/UploadAvatar';
import NavbarShopkeeperProfil from 'src/containers/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';
import ShopkeeperProfilImage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilImage';


// == Import styles
import shopkeeperProfilStyles from './shopkeeperProfilStyles';

// == Composant
const ShopkeeperProfil = ({
  loader,
  userData,
  getUserData,
}) => {
  const classes = shopkeeperProfilStyles();

  // First render => fetch User data
  useEffect(() => {
    getUserData();
  }, []);

  // state
  const [email, setEmail] = useState();
  const [webSite, setWebSite] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const validateEmail = (e) => {
    // console.log('e vaut', e);
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
  };

  const _handleEmailChange = (event) => {
    console.log(event.target.value);
    let errorText = ''
    if (!validateEmail(event.target.value)) {
      let errorText = "Email Format Error"
    }

    console.log(errorText);
    // setState({emailErrorText: errorText, email: val})
  };

  const handleChangeValue = (name) => (event) => {
    switch (name) {
      case 'email':
        console.log(event.target.value);
        if (!validateEmail(name)) {
          //errorText = "Email Format Error"
          console.log('email errror');
        }
        setEmail(event.target.value);
        break;
      case 'webSite':
        console.log(event.target.value);
        setWebSite(event.target.value);
        break;
      case 'phone':
        console.log(event.target.value);
        setPhone(event.target.value);
        break;
      case 'password':
        console.log(event.target.value);
        setPassword(event.target.value);
        break;
      default:
        console.log('Aucun changement');
    }
  };

  const handleSubmit = (file) => (event) => {
    event.preventDefault();
    // console.log('handle uploading-', file);
  };

  return (
    <>
      <Loader loader={loader} />
      {!loader && (
        <Container className={classes.shopkeeperProfilContent} component="main" maxWidth="lg">
          <Paper className={classes.root}>
            <ShopkeeperProfilImage logoPicture={userData.logoPicture} />
            <NavbarShopkeeperProfil />
            <UploadAvatar />
          </Paper>
          <Paper>
            <Typography variant="h4" component="h3" gutterBottom>
              {userData.companyName}
            </Typography>
            <Typography variant="h6" component="h4" gutterBottom>
              Siret : {userData.siret}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {`
                  ${userData.wayNumber ? userData.wayNumber : ''}
                  ${userData.repeatIndex ? userData.repeatIndex : ''}
                  ${userData.wayName ? userData.wayName : ''}
                  ${userData.additionalAddress ? `- ${userData.additionalAddress}` : ''}
                  ${userData.postalCode ? `- ${userData.postalCode}` : ''}
                  ${userData.city ? userData.city.toUpperCase() : ''}
                `}
            </Typography>
          </Paper>
          <Box>
            <form>
              <TextField
                id="email"
                label={userData.email ? userData.email : ''}
                className={classes.textField}
                type="email"
                name="email"
                value={email}
                onChange={_handleEmailChange}
                autoComplete={userData.email}
                margin="dense"
                variant="outlined"
                helperText="Email"

              />
              <TextField
                id="password"
                label="Mot de passe (minimum 8 caractères)"
                className={classes.textField}
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={handleChangeValue('password')}
                margin="dense"
                variant="outlined"
                helperText="Mot de passe"
              />
              <TextField
                id="confirmPassword"
                label="Confirmez le mot de passe"
                className={classes.textField}
                type="password"
                name="repeat-passord"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleChangeValue('passwordConfirm')}
                margin="dense"
                variant="outlined"
                helperText="Confirmation Mot de passe"

              />
              <TextField
                id="website"
                label={userData.website ? userData.website.replace(/(^\w+:|^)\/\//, '') : ''}
                className={classes.textField}
                type="text"
                name="website"
                autoComplete="site web"
                value={webSite}
                onChange={handleChangeValue('webSite')}
                margin="dense"
                variant="outlined"
                helperText="Nom du site Web"

              />
              <TextField
                id="phone"
                label={userData.phone ? userData.phone : ''}
                className={classes.textField}
                type="text"
                name="phone"
                autoComplete={userData.phone}
                value={phone}
                onChange={handleChangeValue('phone')}
                margin="dense"
                variant="outlined"
                helperText="N° de téléphone"

              />
            </form>
          </Box>
          <Paper>
            <Typography variant="h6" component="h4" gutterBottom>
              Description de votre compagnie :
            </Typography>
            <TextareaAutosize
              aria-label="description-companyName"
              defaultValue={userData.companyDescription}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.margin}
            >
              Enregister les modifications
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.margin}
              component={RouterLink}
              to="/shopkeeper/profil/delete"
            >
              Supprimer mon compte
            </Button>
          </Paper>
        </Container>
      )}
    </>
  );
};

ShopkeeperProfil.propTypes = {
  loader: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
};

// == Export
export default ShopkeeperProfil;
