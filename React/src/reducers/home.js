import {
  SAVE_REGIONS_DATA,
  SAVE_CATEGORIES_DATA,
  SET_REGION,
  SET_CATEGORY,
  SET_SNACKBAR,
  RESET_SNACKBAR,
  REDIRECT,
} from '../actions/home';

const initialState = {
  // Display Loader
  loadingRegions: true,
  loadingCategories: true,
  // API Data
  regions: [],
  categories: [],
  // User Search Fields
  category: [],
  region: [],
  // Display SnackBar
  snackbar: false,
  snackbarType: '',
  snackbarMessage: '',
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

    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: true,
        snackbarType: action.severity,
        snackbarMessage: action.message,
      };

    case RESET_SNACKBAR:
      return {
        ...state,
        snackbar: false,
        snackbarMessage: '',
      };

    case REDIRECT:
      return {
        ...state,
        redirectTo: action.link,
        category: [],
        region: [],
      };

    default: return {
      ...state,
      redirectTo: false,
    };
  }
};

export default homeReducer;
