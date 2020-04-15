import axios from 'axios';

import {
  GET_REGIONS_DATA,
  saveRegionsData,
  GET_CATEGORIES_DATA,
  saveCategoriesData,
  GET_SEARCH_HOME_RESULTS,
  redirect,
} from '../actions/home';

const server = require('../api.config.json');

const homeMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_REGIONS_DATA:
      axios.get(`${server.url}:${server.port}/api/regions`)
        .then((response) => {
          // console.log('success regions : ', response.data);
          store.dispatch(saveRegionsData(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;

    case GET_CATEGORIES_DATA:
      axios.get(`${server.url}:${server.port}/api/categories`)
        .then((response) => {
          // console.log('success categories : ', response.data);
          store.dispatch(saveCategoriesData(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;

    case GET_SEARCH_HOME_RESULTS: {
      console.log(`data: {
        "region": ${store.getState().home.regionField},
        "category": ${store.getState().home.categoryField}
      }`);
      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/shopkeepers`,
        data: {
          region: store.getState().home.regionField,
          category: store.getState().home.categoryField
        }
      })
        .then((response) => {
          console.log('success: ', response.data);
          store.dispatch(redirect("/mentions-legales"));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default homeMiddleware;
