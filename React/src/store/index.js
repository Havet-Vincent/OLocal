import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import registerMiddleware from 'src/middlewares/registerMiddleware';
import authMiddleware from 'src/middlewares/authMiddleware';
import homeMiddleware from 'src/middlewares/homeMiddleware';
import shopkeepersMiddleware from 'src/middlewares/shopkeepersMiddleware';

import rootReducer from 'src/reducers';

const enhancers = composeWithDevTools(
  applyMiddleware(
    registerMiddleware,
    authMiddleware,
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
