// action types
export const GET_REGIONS_DATA = 'GET_REGIONS_DATA';
export const SAVE_REGIONS_DATA = 'SAVE_REGIONS_DATA';
export const GET_CATEGORIES_DATA = 'GET_CATEGORIES_DATA';
export const SAVE_CATEGORIES_DATA = 'SAVE_CATEGORIES_DATA';
export const SET_REGION_FIELD = 'SET_REGION_FIELD';
export const SET_CATEGORY_FIELD = 'SET_CATEGORY_FIELD';
export const GET_SEARCH_HOME_RESULTS = 'GET_SEARCH_HOME_RESULTS';

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

export const setRegionField = (id) => ({
  type: SET_REGION_FIELD,
  id,
});

export const setCategoryField = (id) => ({
  type: SET_CATEGORY_FIELD,
  id,
});

export const handleSearchHomeSubmit = () => ({
  type: GET_SEARCH_HOME_RESULTS,
});
