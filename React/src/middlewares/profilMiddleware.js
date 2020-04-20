import axios from 'axios';

import { FETCH_USER, saveUser } from '../actions/profil';

// == Import API server config
const server = require('../api.config.json');

const profilMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_USER: {
      axios({
        method: 'post',
        url: `${server.url}:${server.port}/api/login_id`,
        data: {
          username: action.username,
        },
      })
        .then((response) => {
          console.log('success user : ', response.data);
          // Success => save userId and userRole token in LocalStorage
          const { id, userRole } = response.data;
          localStorage.setItem('userId', id);
          localStorage.setItem('userRole', userRole);
          store.dispatch(saveUser(id, userRole));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
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

export default profilMiddleware;
