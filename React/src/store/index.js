import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import homeMiddleware from 'src/middlewares/homeMiddleware';
import shopkeepersMiddleware from 'src/middlewares/shopkeepersMiddleware';
import registerMiddleware from 'src/middlewares/registerMiddleware';

import rootReducer from 'src/reducers';

const enhancers = composeWithDevTools(
  applyMiddleware(
    homeMiddleware,
    shopkeepersMiddleware,
    registerMiddleware,
    // ... other middlewares
  ),
);

const store = createStore(
  // reducer
  rootReducer,
  // enhancer
  enhancers,
);

export default store;
