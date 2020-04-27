// == Import validators
import { verifySiret } from 'src/utils/validators';

import axios from 'axios';

import {
  ADD_LOCAL_SUPPLIER,
  GET_SUPPLIERS_BY_REGION,
  saveSuppliersByRegion,
  toogleSupplierForm,
  setLoaderSupplierForm,
} from '../actions/profil';
import { setSnackbar } from '../actions/home';

// == Import API server config
const server = require('../api.config.json');

const supplierMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_LOCAL_SUPPLIER: {
      const token = localStorage.getItem('token');
      const {
        siret,
        supplierRegion: region,
      } = store.getState().profil;
      const verifiedSiret = verifySiret(siret);

      if (verifiedSiret && region !== null) {
        axios({
          method: 'post',
          url: `${server.url}:${server.port}/api/localsuppliers/add`,
          headers: { Authorization: `Bearer ${token}` },
          data: {
            siret: verifiedSiret,
            region,
          },
        })
          .then(() => {
            store.dispatch(toogleSupplierForm());
            store.dispatch(setSnackbar('success', 'La producteur a été ajouté à la liste'));
          })
          .catch((error) => {
            if (error.response.status === 409) {
              // eslint-disable-next-line no-console
              console.warn(error);
              store.dispatch(setLoaderSupplierForm(false));
              store.dispatch(setSnackbar('error', 'Ce producteur (SIRET) existe déjà'));
              return;
            }
            // eslint-disable-next-line no-console
            console.warn(error);
            store.dispatch(setLoaderSupplierForm(false));
            store.dispatch(setSnackbar('error', 'Erreur Interne : Echec ajout du producteur'));
          });

        next(action);
        break;
      }

      store.dispatch(setSnackbar('error', 'Le SIRET n\'est pas valide'));
      setTimeout(() => {
        store.dispatch(setLoaderSupplierForm(false));
      }, 600);
      next(action);
      break;
    }

    case GET_SUPPLIERS_BY_REGION: {
      const { id: regionId } = store.getState().profil.userData.region;
      const token = localStorage.getItem('token');
      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/regions/${regionId}/localsuppliers`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          region: regionId,
        },
      })
        .then((response) => {
          // console.log('success suppliers : ', response.data);
          store.dispatch(saveSuppliersByRegion(response.data));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setSnackbar('error', 'Erreur interne : Echec récupération des données producteurs'));
        });

      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default supplierMiddleware;
