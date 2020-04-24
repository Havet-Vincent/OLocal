import axios from 'axios';

import {
  HANDLE_SUPPLIER_SUBMIT,
  GET_SUPPLIERS_BY_REGION,
  saveSuppliersByRegion,
} from '../actions/profil';
import { setSnackbar } from '../actions/home';

// == Import API server config
const server = require('../api.config.json');

const supplierMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case HANDLE_SUPPLIER_SUBMIT: {
      const token = localStorage.getItem('token');
      const {
        siret,
        region,
      } = store.getState().profil;

      if (siret !== '' && region !== '') {
        axios({
          method: 'post',
          url: `${server.url}:${server.port}/api/localsuppliers/add`,
          headers: { Authorization: `Bearer ${token}` },
          data: {
            siret,
            region,
          },
        })
          .then(() => {
            store.dispatch(setSnackbar('success', 'Ajout nouveau producteur réussi'));
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error);
            store.dispatch(setSnackbar('error', 'Echec ajout producteur. Erreur SIRET'));
          })
          .finally(() => {
          });
      }

      next(action);
      break;
    }

    case GET_SUPPLIERS_BY_REGION:{
      // console.log('GET_SUPPLIERS_BY_REGION');
      // console.log(store.getState().profil);
      const {
        id: id,
      } = store.getState().profil.currentRegion;
      console.log(id);
      const token = localStorage.getItem('token');
      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/regions/${id}/localsuppliers`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          region: id,
        },
      })
        .then((response) => {
          // console.log('success suppliers : ', response.data);
          store.dispatch(saveSuppliersByRegion(response.data));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
        });

      next(action);
      break;
    }


    default:
      next(action);
  }
};

export default supplierMiddleware;

