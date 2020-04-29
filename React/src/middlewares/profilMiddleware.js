import axios from 'axios';

import {
  FETCH_USER,
  GET_PROFIL,
  GET_USER_DATA,
  SET_LOGO_PICTURE_ERROR,
  UPDATE_USER_DATA,
  DELETE_USER_ACCOUNT,
  clearUserData,
  getUserData,
  saveUser,
  saveUserData,
  getCatalog,
  getSuppliersByRegion,
} from '../actions/profil';
import { clearAuthData } from '../actions/authentication';
import { redirect, setSnackbar } from '../actions/home';


const profilMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_USER: {
      axios({
        method: 'post',
        url: `${process.env.URL_API}/api/login_id`,
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
          if (error.response.status === 409) {
            // eslint-disable-next-line no-console
            // console.warn(error);
            store.dispatch(clearAuthData());
            store.dispatch(clearUserData());
            return;
          }
          // eslint-disable-next-line no-console
          console.warn(error);
        });
      next(action);
      break;
    }

    case GET_PROFIL: {
      const { userRole } = store.getState().profil;
      switch (userRole[0]) {
        case 'ROLE_SHOPKEEPER':
          store.dispatch(redirect('/commercant/profil/informations'));
          next(action);
          break;

        case 'ROLE_ADMIN':
          // store.dispatch(redirect(`${process.env.URL_API}/admin`));
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
        case 'ROLE_SHOPKEEPER':
          axios({
            method: 'post',
            url: `${process.env.URL_API}/api/shopkeepers/${userId}`,
            data: {
              id: userId,
            },
          })
            .then((response) => {
              // console.log('success userData : ', response.data);
              store.dispatch(saveUserData(response.data));
              store.dispatch(getCatalog());
              store.dispatch(getSuppliersByRegion());
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.warn(error);
              store.dispatch(setSnackbar('error', 'Erreur interne : Echec récupération des données utilisateur'));
            });

          next(action);
          break;

        default:
          next(action);
      }
      next(action);
      break;
    }

    case SET_LOGO_PICTURE_ERROR:
      store.dispatch(setSnackbar('error', action.errorMsg));
      next(action);
      break;

    case UPDATE_USER_DATA: {
      const { userId, userRole } = store.getState().profil;
      const token = localStorage.getItem('token');
      switch (userRole[0]) {
        case 'ROLE_SHOPKEEPER': {
          const {
            email,
            contact,
            firstname,
            lastname,
            companyDescription,
            phone,
            website,
            logoPicture,
          } = store.getState().profil.userData;
          const { newEmail } = store.getState().profil;
          const { confirmPassword: password } = store.getState().authentication;

          axios({
            method: 'post',
            url: `${process.env.URL_API}/api/shopkeepers/${userId}/edit`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
              id: userId,
              email: newEmail,
              contact,
              firstname,
              lastname,
              password,
              companyDescription,
              phone,
              website,
              logoPicture,
            },
          })
            .then(() => {
              // console.log('success update userData : ', response.data);
              if (password) {
                store.dispatch(clearAuthData());
                store.dispatch(clearUserData());
                store.dispatch(setSnackbar('success', 'Votre mot de passe a bien été modifié. Veuillez vous reconnecter avec vos nouveaux identifiants'));
                next(action);
                return;
              }
              if (email !== newEmail) {
                store.dispatch(clearAuthData());
                store.dispatch(clearUserData());
                store.dispatch(setSnackbar('success', 'Votre email a bien été modifié. Veuillez vous reconnecter avec vos nouveaux identifiants'));
                next(action);
                return;
              }

              store.dispatch(getUserData());
              store.dispatch(setSnackbar('success', 'Vos modifications sont enregistrées'));
            })
            .catch((error) => {
              if (error.response.status === 409) {
                // eslint-disable-next-line no-console
                // console.warn(error);
                store.dispatch(setSnackbar('error', 'L\'addresse email saisie n\'est pas valide'));
                return;
              }
              // eslint-disable-next-line no-console
              console.warn(error);
              store.dispatch(setSnackbar('error', 'Erreur interne : Echec enregistrement des informations'));
            });

          next(action);
          break;
        }

        default:
          next(action);
      }
      next(action);
      break;
    }

    case DELETE_USER_ACCOUNT: {
      const { userId, userRole } = store.getState().profil;
      const token = localStorage.getItem('token');
      switch (userRole[0]) {
        case 'ROLE_SHOPKEEPER': {
          axios({
            method: 'delete',
            url: `${process.env.URL_API}/api/shopkeepers/${userId}/delete`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
              id: userId,
            },
          })
            .then((response) => {
              // eslint-disable-next-line no-console
              console.log('success delete userAccount : ', response.data);
              store.dispatch(clearAuthData());
              store.dispatch(clearUserData());
              store.dispatch(redirect('/'));
              store.dispatch(setSnackbar('info', 'Votre compte à bien été supprimé'));
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.warn(error);
              store.dispatch(setSnackbar('error', 'Erreur interne : Echec suppression du compte utilisateur'));
            });

          next(action);
          break;
        }
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
