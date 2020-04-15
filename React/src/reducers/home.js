import {
  SAVE_REGIONS_DATA,
  SAVE_CATEGORIES_DATA,
  SET_REGION,
  SET_CATEGORY,
  SET_SEARCH_NOT_MATCH_ALERT,
  RESET_SEARCH_NOT_MATCH_ALERT,
  REDIRECT,
} from '../actions/home';

const initialState = {
  // API Data
  regions: [],
  categories: [],
  // User Search Fields
  category: [],
  region: [],
  // Display Home Loader
  loadingRegions: true,
  loadingCategories: true,
  // Alert if Search not match
  searchNotMatch: false,
  // Redirection link after success Search request
  redirectTo: false,
};

const homeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_REGIONS_DATA:
      return {
        ...state,
        regions: action.regions,
        loadingRegions: false,
      };

    case SAVE_CATEGORIES_DATA:
      return {
        ...state,
        categories: action.categories,
        loadingCategories: false,
      };

    case SET_REGION:
      return {
        ...state,
        region: action.value,
      };

    case SET_CATEGORY:
      return {
        ...state,
        category: action.value,
      };
    
    case SET_SEARCH_NOT_MATCH_ALERT:
      return {
        ...state,
        searchNotMatch: true,
        categoryField: '',
        regionField: '',
      };

    case RESET_SEARCH_NOT_MATCH_ALERT:
      return {
        ...state,
        searchNotMatch: false,
      };

    case REDIRECT:
      return {
        ...state,
        redirectTo: action.link,
        categoryField: '',
        regionField: '',
      };

    default: return {
      ...state,
      redirectTo: false,
    };
  }
};

export default homeReducer;
