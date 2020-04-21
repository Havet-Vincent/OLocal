// action types
export const GET_REGIONS_DATA = 'GET_REGIONS_DATA';
export const SAVE_REGIONS_DATA = 'SAVE_REGIONS_DATA';
export const GET_CATEGORIES_DATA = 'GET_CATEGORIES_DATA';
export const SAVE_CATEGORIES_DATA = 'SAVE_CATEGORIES_DATA';
export const SET_REGION = 'SET_REGION';
export const SET_CATEGORY = 'SET_CATEGORY';
export const GET_SEARCH_HOME_RESULTS = 'GET_SEARCH_HOME_RESULTS';
export const SET_SNACKBAR = 'SET_SNACKBAR';
export const RESET_SNACKBAR = 'RESET_SNACKBAR';
export const REDIRECT = 'REDIRECT';
export const CLEAR_REDIRECT = 'CLEAR_REDIRECT';

// action creators
export const getRegionsData = () => ({
  type: GET_REGIONS_DATA,
});

export const saveRegionsData = (regions) => ({
  type: SAVE_REGIONS_DATA,
  regions,
});

export const getCategoriesData = () => ({
  type: GET_CATEGORIES_DATA,
});

export const saveCategoriesData = (categories) => ({
  type: SAVE_CATEGORIES_DATA,
  categories,
});

export const setRegion = (value) => ({
  type: SET_REGION,
  value,
});

export const setCategory = (value) => ({
  type: SET_CATEGORY,
  value,
});

export const handleSearchHomeSubmit = () => ({
  type: GET_SEARCH_HOME_RESULTS,
});

export const setSnackbar = (severity, message) => ({
  type: SET_SNACKBAR,
  severity,
  message,
});

export const resetSnackbar = () => ({
  type: RESET_SNACKBAR,
});

export const redirect = (link) => ({
  type: REDIRECT,
  link,
});

export const clearRedirect = () => ({
  type: CLEAR_REDIRECT,
});
