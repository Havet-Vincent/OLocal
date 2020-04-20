import { combineReducers } from 'redux';

// import reducers
import registerReducer from './register';
import authenticationReducer from './authentication';
import profilReducer from './profil';
import homeReducer from './home';
import shopkeepersReducer from './shopkeepers';

const rootReducer = combineReducers({
  register: registerReducer,
  authentication: authenticationReducer,
  profil: profilReducer,
  home: homeReducer,
  shopkeepers: shopkeepersReducer,
});

export default rootReducer;
