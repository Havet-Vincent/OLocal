import {
  UPDATE_USER_DATA,
  ADD_CATALOG_ITEM,
  UPDATE_CATALOG_ITEM,
  DELETE_CATALOG_ITEM,
  DELETE_USER_ACCOUNT,
} from '../actions/profil';
import { fetchAuth } from '../actions/authentication';

const requestMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case UPDATE_USER_DATA || ADD_CATALOG_ITEM || UPDATE_CATALOG_ITEM || DELETE_CATALOG_ITEM || DELETE_USER_ACCOUNT:
      // console.log('requestMiddleware');
      store.dispatch(fetchAuth());
      next(action);
      break;

    default:
      next(action);
  }
};

export default requestMiddleware;
