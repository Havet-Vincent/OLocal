import axios from 'axios';

import {
  SUBMIT_SIGNIN,
  setAuthentication,
} from '../actions/authentication';
import { setSnackbar } from '../actions/home';

// == Import API server config
const server = require('../api.config.json');

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SIGNIN: {
      const {
        email,
        confirmPassword: password,
        passwordConfirmed,
      } = store.getState().register;

      if (email !== '' && passwordConfirmed) {
        axios({
          method: 'post',
          url: `${server.url}:${server.port}/api/login`,
          data: {
            email,
            password,
          },
        })
          .then((response) => {
            console.log('success authentication : ', response.data);
            store.dispatch(setSnackbar('success', 'Vous êtes connecté. Vous pouvez accéder à votre profil'));
            store.dispatch(setAuthentication());
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error);
            store.dispatch(setSnackbar('error', 'Echec de la connexion'));
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

export default authMiddleware;
