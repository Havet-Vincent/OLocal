import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import UploadAvatar from 'src/components/Pages/Profil/UploadAvatar';
import NavbarShopkeeperProfil from 'src/components/Pages/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';
import ShopkeeperProfilImage from 'src/components/Pages/Profil/ShopkeeperProfil/ShopkeeperProfilImage';

// == Import components
import {
  TextField,
  Container,
  Paper,
  Box,
  Typography,
  Button,
  TextareaAutosize,
  Snackbar,
} from '@material-ui/core';

// for the alert
import MuiAlert from '@material-ui/lab/Alert';

// datas for the tests
import shopkeeper from 'src/dataShop';


// == Import assets & styles
import shopkeeperProfilStyles from './shopkeeperProfilStyles';

// Search Snackbar Alert & transition effect
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// == Import API server config
const server = require('src/api.config.json');

// == Composant
const ShopkeeperProfil = () => {
  const classes = shopkeeperProfilStyles();

  // state
  const [email, setEmail] = useState();
  const [webSite, setWebSite] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [imgUpload, setImgUpload,] = useState();
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState();
  const [severity, setSeverity] = useState();

  const validateEmail = (e) => {
    // console.log('e vaut', e);
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
  };

  // open the alert
  const handleClickSnackBar = () => {
    setOpen(true);
  };

  // close the alert
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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

  // 
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
      <Container className={classes.shopkeeperProfilContent} component="main" maxWidth="lg">
          <Paper className={classes.root}>
            <ShopkeeperProfilImage />
            <NavbarShopkeeperProfil />
            <UploadAvatar />
          </Paper>
          <Paper>
            <Typography variant="h4" component="h3" gutterBottom>
              {shopkeeper.companyName}
            </Typography>
            <Typography variant="h6" component="h4" gutterBottom>
              siret : {shopkeeper.siret}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {`
                  ${shopkeeper.wayNumber ? shopkeeper.wayNumber : ''}
                  ${shopkeeper.repeatIndex ? shopkeeper.repeatIndex : ''}
                  ${shopkeeper.wayName ? shopkeeper.wayName : ''}
                  ${shopkeeper.additionalAddress ? `- ${shopkeeper.additionalAddress}` : ''}
                  ${shopkeeper.postalCode ? `- ${shopkeeper.postalCode}` : ''}
                  ${shopkeeper.city ? shopkeeper.city.toUpperCase() : ''}
                `}
            </Typography>
          </Paper>
        <Box>
          <form>
            <TextField
              id="email"
              label={shopkeeper.email ? shopkeeper.email : ''}
              className={classes.textField}
              type="email"
              name="email"
              value={email}
              onChange={_handleEmailChange}
              autoComplete={shopkeeper.email}
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
              label={shopkeeper.website ? shopkeeper.website.replace(/(^\w+:|^)\/\//, '') : ''}
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
              label={shopkeeper.phone ? shopkeeper.phone : ''}
              className={classes.textField}
              type="text"
              name="phone"
              autoComplete={shopkeeper.phone}
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
            defaultValue={shopkeeper.companyDescription}
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
        <Snackbar
          open={open}
          autoHideDuration={7000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackBar}
        >
          <Alert onClose={handleCloseSnackBar} severity={severity} >
            {messageError}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};


// == Export
export default ShopkeeperProfil;
