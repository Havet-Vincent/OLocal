import {
  SAVE_SEARCH_HOME_DATA,
  SAVE_SHOPKEEPER_DATA,
} from '../actions/shopkeepers';

const initialState = {
  // API Home Search results Data
  currentCategory: {},
  currentRegion: {},
  searchResults: [],
  // API Shopkeeper Data
  shopkeeper: {},
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

    case SAVE_SHOPKEEPER_DATA:
      return {
        ...state,
        shopkeeper: action.shopkeeper,
      };

    default: return state;
  }
};

export default shopkeepersReducer;
