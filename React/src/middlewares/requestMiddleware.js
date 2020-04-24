import {
  DELETE_CATALOG_ITEM,
  UPDATE_CATALOG_ITEM,
  GET_SUPPLIERS_BY_REGION,
  HANDLE_SUPPLIER_SUBMIT,
} from '../actions/profil';
import { fetchAuth } from '../actions/authentication';

const requestMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case DELETE_CATALOG_ITEM || UPDATE_CATALOG_ITEM || GET_SUPPLIERS_BY_REGION || HANDLE_SUPPLIER_SUBMIT:
      // console.log('requestMiddleware');
      store.dispatch(fetchAuth());
      next(action);
      break;

    default:
      next(action);
  }
};

export default requestMiddleware;
