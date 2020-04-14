import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import homeMiddleware from 'src/middlewares/homeMiddleware';

import rootReducer from 'src/reducers';

const enhancers = composeWithDevTools(
  applyMiddleware(
    homeMiddleware,
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
