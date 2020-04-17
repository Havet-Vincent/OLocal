import axios from 'axios';

// import { redirect } from '../actions/home';
import {
  SUBMIT_SIGNUP,
} from '../actions/register';

// == Import API server config
const server = require('../api.config.json');

const registerMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP:
      const { siret, region, email, confirmPassword: password, passwordConfirmed } = store.getState().register;
      {passwordConfirmed && (
      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/shopkeepers/add`,
        data: {
          siret,
          region,
          email,
          password
        }
      })
        .then((response) => {
          console.log('success register : ', response.data);
          // Save data & redirect to Shopkeeper page
          // store.dispatch(saveShopkeeperData(response.data));
          // store.dispatch(redirect(`/commercant/${id}`));
        })
        .catch((error) => {
          console.warn(error);
        })
        .finally(() => {
        })
      )}
    
      next(action);
      break;

    default:
      next(action);
  }
};

export default registerMiddleware;
