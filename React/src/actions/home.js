// action types
export const GET_REGIONS_DATA = 'GET_REGIONS_DATA';
export const SAVE_REGIONS_DATA = 'SAVE_REGIONS_DATA';
export const GET_CATEGORIES_DATA = 'GET_CATEGORIES_DATA';
export const SAVE_CATEGORIES_DATA = 'SAVE_CATEGORIES_DATA';

// action creators
export const getRegionsData = () => ({
  type: GET_REGIONS_DATA,
});

export const saveRegionsData = (regions) => ({
  type: SAVE_RECIPES,
  regions,
});

export const getCategoriesData = () => ({
  type: GET_CATEGORIES_DATA,
});

export const saveCategoriesData = (categories) => ({
  type: SAVE_CATEGORIES_DATA,
  categories,
});
