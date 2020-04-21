import axios from 'axios';

import {
  DELETE_CATALOG_ITEM,
  UPDATE_CATALOG_ITEM,
  getCatalog,
} from '../actions/profil';
import { setSnackbar } from '../actions/home';

// == Import API server config
const server = require('../api.config.json');

const catalogMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case DELETE_CATALOG_ITEM: {
      const { catalogId: id } = action.data;
      const token = localStorage.getItem('token');

      axios({
        method: 'delete',
        url: `${server.url}:${server.port}/api/catalogs/${id}/delete`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          catalog: id,
        },
      })
        .then(() => {
          // console.log('success delete catalog : ', response.data);
          store.dispatch(getCatalog());
          store.dispatch(setSnackbar('success', 'Elément supprimé'));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setSnackbar('error', 'Echec de la suppression'));
        })
        .finally(() => {
        });
      next(action);
      break;
    }

    case UPDATE_CATALOG_ITEM: {
      const {
        catalogId: id,
        categoryId: category,
        supplierId: localSupplier,
        product,
      } = action.data;
      const token = localStorage.getItem('token');

      console.log(action.data);

      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/catalogs/${id}/edit`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          id,
          category,
          localSupplier,
          product,
        },
      })
        .then(() => {
          // console.log('success update catalog : ', response.data);
          store.dispatch(getCatalog());
          store.dispatch(setSnackbar('success', 'Elément modifié'));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setSnackbar('error', 'Echec de la modification'));
        })
        .finally(() => {
        });
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default catalogMiddleware;
