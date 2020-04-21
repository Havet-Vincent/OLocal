import axios from 'axios';

import {
  FETCH_USER,
  GET_PROFIL,
  GET_PROFIL_PAGE,
  GET_USER_DATA,
  saveUser,
  saveUserData,
  getCatalog,
} from '../actions/profil';
import { redirect, setSnackbar } from '../actions/home';

// == Import API server config
const server = require('../api.config.json');

const profilMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_USER: {
      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/login_id`,
        data: {
          username: action.username,
        },
      })
        .then((response) => {
          // console.log('success user : ', response.data);
          // Success => save userId and userRole token in LocalStorage
          const { id, userRole } = response.data;
          localStorage.setItem('userId', id);
          localStorage.setItem('userRole', userRole);
          store.dispatch(saveUser(id, userRole));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
        });
      next(action);
      break;
    }

    case GET_PROFIL: {
      const { userRole } = store.getState().profil;
      switch (userRole[0]) {
        case 'ROLE_USER':
          store.dispatch(redirect('/commercant/profil/informations'));
          next(action);
          break;
        default:
          next(action);
      }
      next(action);
      break;
    }

    case GET_PROFIL_PAGE: {
      const { userRole } = store.getState().profil;
      switch (userRole[0]) {
        case 'ROLE_USER':
          store.dispatch(redirect('/commercant/profil/page'));
          next(action);
          break;
        default:
          next(action);
      }
      next(action);
      break;
    }

    case GET_USER_DATA: {
      const { userId, userRole } = store.getState().profil;
      switch (userRole[0]) {
        case 'ROLE_USER':
          axios({
            method: 'post',
            url: `${server.url}:${server.port}/api/shopkeepers/${userId}`,
            data: {
              id: userId,
            },
          })
            .then((response) => {
              // console.log('success userData : ', response.data);
              store.dispatch(saveUserData(response.data));
              store.dispatch(getCatalog());
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.warn(error);
              store.dispatch(setSnackbar('error', 'Echec récupération des données utilisateur'));
            });

          next(action);
          break;
        default:
          next(action);
      }
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default profilMiddleware;
