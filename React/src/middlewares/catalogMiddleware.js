import axios from 'axios';

import {
  DELETE_CATALOG_ITEM,
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

    default:
      next(action);
  }
};

export default catalogMiddleware;
