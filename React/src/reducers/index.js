import { combineReducers } from 'redux';

// import reducers
import homeReducer from './home';
import shopkeepersReducer from './shopkeepers';
import registerReducer from './register';

const rootReducer = combineReducers({
  home: homeReducer,
  shopkeepers: shopkeepersReducer,
  register: registerReducer,
});

export default rootReducer;
