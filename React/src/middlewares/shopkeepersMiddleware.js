import axios from 'axios';

import { GET_SHOPKEEPER_DATA, saveShopkeeperData, setNotMatch } from '../actions/shopkeepers';

const shopkeepersMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_SHOPKEEPER_DATA: {
      const id = Number(action.shopkeeperId);
      axios({
        method: 'post',
        url: `${process.env.URL_API}/api/shopkeepers/${id}`,
        data: {
          id: Number(action.shopkeeperId),
        },
      })
        .then((response) => {
          // console.log('success shopkeeper : ', response.status);
          store.dispatch(saveShopkeeperData(response.data));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          store.dispatch(setNotMatch());
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

export default shopkeepersMiddleware;
