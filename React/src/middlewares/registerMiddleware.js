// == Import validators
import { verifySiret, validateEmail } from 'src/utils/validators';

import axios from 'axios';

import {
  SUBMIT_SIGNUP,
  setRegister,
  toogleRegisterLoader,
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
      } = store.getState().register;
      const verifiedSiret = verifySiret(siret);
      const validEmail = validateEmail(email);

      if (verifiedSiret && region !== '' && validEmail && passwordConfirmed) {
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
          .then(() => {
            // console.log('success register : ', response.data);
            store.dispatch(setRegister());
            store.dispatch(setSnackbar('success', 'Inscription réussie. Vous pouvez vous connecter à votre compte'));
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error);
            store.dispatch(setSnackbar('error', 'Echec inscription : Erreur SIRET ou email déjà existant'));
            store.dispatch(toogleRegisterLoader());
          })
          .finally(() => {
          });

        next(action);
        break;
      }

      setTimeout(() => {
        store.dispatch(toogleRegisterLoader());
      }, 600);
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default registerMiddleware;
