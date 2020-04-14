import axios from 'axios';

import { GET_REGIONS_DATA, saveRegionsData, GET_CATEGORIES_DATA, saveCategoriesData, GET_SEARCH_HOME_RESULTS } from 'src/actions/home';

const homeMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_REGIONS_DATA:
      axios.get('http://nicolas-chopin.vpnuser.lan:8001/api/regions')
        .then((response) => {
          console.log('success regions : ', response.data);
          store.dispatch(saveRegionsData(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;

    case GET_CATEGORIES_DATA:
      axios.get('http://nicolas-chopin.vpnuser.lan:8001/api/categories')
        .then((response) => {
          console.log('success categories : ', response.data);
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
        method: 'get',
        url: 'http://nicolas-chopin.vpnuser.lan:8001/shopkeepers',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          region: store.getState().home.regionField,
          category: store.getState().home.categoryField
        }
      })
        .then((response) => {
          console.log('success categories : ', response.data);
          // store.dispatch(saveUser(response.data.logged, response.data.info));
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
