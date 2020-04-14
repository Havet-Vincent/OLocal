import { combineReducers } from 'redux';

// import reducers
import homeReducer from './home';

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
