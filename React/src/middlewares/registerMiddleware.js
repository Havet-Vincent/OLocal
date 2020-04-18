import axios from 'axios';

import {
  SUBMIT_SIGNUP,
  setRegister,
} from '../actions/register';
import { setSnackbar } from '../actions/home';

// == Import API server config
const server = require('../api.config.json');

const registerMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP: {
      const {
        siret,
        region,
        email,
        confirmPassword: password,
        passwordConfirmed,
      } = store.getState().authentication;

      if (siret !== '' && region !== '' && email !== '' && passwordConfirmed) {
        axios({
          method: 'post',
          url: `${server.url}:${server.port}/api/shopkeepers/add`,
          data: {
            siret,
            region,
            email,
            password,
          },
        })
          .then((response) => {
            console.log('success register : ', response.data);
            store.dispatch(setSnackbar('success', 'Inscription réussie. Vous pouvez vous connecter à votre compte'));
            store.dispatch(setRegister());
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error);
            store.dispatch(setSnackbar('error', 'Echec inscription. Erreur SIRET ou email déjà existant'));
          })
          .finally(() => {
          });
      }

      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default registerMiddleware;
