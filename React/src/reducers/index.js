import { combineReducers } from 'redux';

// import reducers
import homeReducer from './home';
import shopkeepersReducer from './shopkeepers';

const rootReducer = combineReducers({
  home: homeReducer,
  shopkeepers: shopkeepersReducer,
});

export default rootReducer;
