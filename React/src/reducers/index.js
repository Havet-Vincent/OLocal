import { combineReducers } from 'redux';

// import reducers
import registerReducer from './register';
import authenticationReducer from './authentication';
import homeReducer from './home';
import shopkeepersReducer from './shopkeepers';

const rootReducer = combineReducers({
  register: registerReducer,
  authentication: authenticationReducer,
  home: homeReducer,
  shopkeepers: shopkeepersReducer,
});

export default rootReducer;
