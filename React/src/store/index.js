import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import requestMiddleware from 'src/middlewares/requestMiddleware';
import registerMiddleware from 'src/middlewares/registerMiddleware';
import authMiddleware from 'src/middlewares/authMiddleware';
import profilMiddleware from 'src/middlewares/profilMiddleware';
import catalogMiddleware from 'src/middlewares/catalogMiddleware';
import homeMiddleware from 'src/middlewares/homeMiddleware';
import shopkeepersMiddleware from 'src/middlewares/shopkeepersMiddleware';

import rootReducer from 'src/reducers';

const enhancers = composeWithDevTools(
  applyMiddleware(
    requestMiddleware,
    registerMiddleware,
    authMiddleware,
    profilMiddleware,
    catalogMiddleware,
    homeMiddleware,
    shopkeepersMiddleware,
  ),
);

const store = createStore(
  // reducer
  rootReducer,
  // enhancer
  enhancers,
);

export default store;
