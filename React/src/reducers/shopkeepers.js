import {
  SAVE_SEARCH_HOME_DATA,
} from '../actions/shopkeepers';

const initialState = {
  // API Home Search results Data
  currentCategory: [],
  currentRegion: [],
  searchResults: [],
};

const shopkeepersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_SEARCH_HOME_DATA:
      return {
        ...state,
        currentCategory: action.category,
        currentRegion: action.region,
        searchResults: action.results,
      };

    default: return state;
  }
};

export default shopkeepersReducer;
