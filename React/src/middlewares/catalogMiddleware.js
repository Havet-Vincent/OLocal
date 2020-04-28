import axios from 'axios';

import {
  ADD_CATALOG_ITEM,
  UPDATE_CATALOG_ITEM,
  DELETE_CATALOG_ITEM,
  getUserData,
} from '../actions/profil';
import { setSnackbar } from '../actions/home';

const catalogMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_CATALOG_ITEM: {
      const { userId: user } = store.getState().profil;
      const {
        categoryId: category,
        supplierId: localSupplier,
        product,
      } = action.data;
      const token = localStorage.getItem('token');
      axios({
        method: 'post',
        url: `${process.env.URL_API}/api/catalogs/add`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          user,
          category,
          localSupplier,
          product,
        },
      })
        .then(() => {
          // console.log('success add catalog : ', response.data);
          store.dispatch(getUserData());
          store.dispatch(setSnackbar('success', 'Elément ajouté'));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setSnackbar('error', 'Le produit n\'a pas été ajouté. Veuillez renseigner une catégorie et un producteur'));
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
      axios({
        method: 'post',
        url: `${process.env.URL_API}/api/catalogs/${id}/edit`,
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
          store.dispatch(getUserData());
          store.dispatch(setSnackbar('success', 'Elément modifié'));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setSnackbar('error', 'Erreur interne : Echec de la modification'));
        });
      next(action);
      break;
    }

    case DELETE_CATALOG_ITEM: {
      const { catalogId: id } = action.data;
      const token = localStorage.getItem('token');
      axios({
        method: 'delete',
        url: `${process.env.URL_API}/api/catalogs/${id}/delete`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          catalog: id,
        },
      })
        .then(() => {
          // console.log('success delete catalog : ', response.data);
          store.dispatch(getUserData());
          store.dispatch(setSnackbar('success', 'Elément supprimé'));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setSnackbar('error', 'Erreur interne : Echec de la suppression'));
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
