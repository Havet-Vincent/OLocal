// action types
export const GET_REGIONS_DATA = 'GET_REGIONS_DATA';
export const SAVE_REGIONS_DATA = 'SAVE_REGIONS_DATA';
export const GET_CATEGORIES_DATA = 'GET_CATEGORIES_DATA';
export const SAVE_CATEGORIES_DATA = 'SAVE_CATEGORIES_DATA';
export const SET_REGION = 'SET_REGION';
export const SET_CATEGORY = 'SET_CATEGORY';
export const GET_SEARCH_HOME_RESULTS = 'GET_SEARCH_HOME_RESULTS';
export const SET_SEARCH_NOT_MATCH_ALERT= 'SET_SEARCH_NOT_MATCH_ALERT';
export const RESET_SEARCH_NOT_MATCH_ALERT= 'RESET_SEARCH_NOT_MATCH_ALERT';
export const REDIRECT = 'REDIRECT';

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

export const setSearchNotMatch = () => ({
  type: SET_SEARCH_NOT_MATCH_ALERT,
});

export const resetSearchNotMatch = () => ({
  type: RESET_SEARCH_NOT_MATCH_ALERT,
});

export const redirect = (link) => ({
  type: REDIRECT,
  link,
});
