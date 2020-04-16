import axios from 'axios';

import { redirect } from '../actions/home';
import {
  GET_SHOPKEEPER_DATA,
  saveShopkeeperData,
} from '../actions/shopkeepers';

// == Import API server config
const server = require('../api.config.json');

const shopkeepersMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_SHOPKEEPER_DATA:
      const id = action.shopkeeperId;
      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/shopkeepers/${id}`,
        data: {
          id,
        }
      })
        .then((response) => {
          // console.log('success shopkeeper : ', response.data);
          // Save data & redirect to Shopkeeper page
          store.dispatch(saveShopkeeperData(response.data));
          store.dispatch(redirect(`/commercant/${id}`));
        })
        .catch((error) => {
          console.warn(error);
        })
        .finally(() => {
        });
    
      next(action);
      break;

    default:
      next(action);
  }
};

export default shopkeepersMiddleware;
