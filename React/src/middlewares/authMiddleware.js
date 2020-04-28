import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {
  SUBMIT_SIGNIN,
  FETCH_AUTHENTICATION,
  SET_LOGOUT,
  saveAuthentication,
  setUserAuth,
  clearAuthData,
} from '../actions/authentication';
import { fetchUser, clearUserData } from '../actions/profil';
import { redirect, setSnackbar } from '../actions/home';


const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SIGNIN: {
      const {
        email: username,
        password,
      } = store.getState().authentication;
      axios({
        method: 'post',
        url: `${process.env.URL_API}/api/login`,
        data: {
          username,
          password,
        },
      })
        .then((response) => {
          // console.log('success authentication : ', response.data);
          // Success => save token and refresh token in LocalStorage
          const { token, refreshToken } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          // Save authentication data & fetch user id & role
          store.dispatch(saveAuthentication(token, refreshToken));
          store.dispatch(fetchUser(username));
          store.dispatch(setSnackbar('success', 'Vous êtes connecté. Vous pouvez accéder à votre compte'));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setSnackbar('error', 'Echec de la connexion : Veuillez vérifier vos identifiants'));
        })
        .finally(() => {
        });
      next(action);
      break;
    }

    case FETCH_AUTHENTICATION: {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        axios({
          method: 'post',
          url: `${process.env.URL_API}/api/token/refresh`,
          data: {
            refreshToken,
          },
        })
          .then((response) => {
            // console.log('success fetch authentication : ', response.data);
            // Success => save token in LocalStorage
            const { token } = response.data;
            localStorage.setItem('token', token);
            // Set user authentication & fetch user id & role
            store.dispatch(setUserAuth(token, refreshToken));
            const { username } = jwtDecode(token);
            store.dispatch(fetchUser(username));
          })
          .catch((error) => {
            if (error.response.status === 409) {
              // eslint-disable-next-line no-console
              // console.warn(error);
              store.dispatch(clearAuthData());
              store.dispatch(clearUserData());
              store.dispatch(redirect('/'));
              return;
            }
            // eslint-disable-next-line no-console
            console.warn(error);
          })
          .finally(() => {
          });

        next(action);
        break;
      }

      store.dispatch(redirect('/'));
      next(action);
      break;
    }

    case SET_LOGOUT:
      store.dispatch(clearUserData());
      store.dispatch(clearAuthData());
      store.dispatch(redirect('/'));
      store.dispatch(setSnackbar('info', 'Vous êtes déconnecté'));
      next(action);
      break;

    default:
      next(action);
  }
};

export default authMiddleware;
