// action types
export const SAVE_SEARCH_HOME_DATA = 'SAVE_SEARCH_HOME_DATA';
export const GET_SHOPKEEPER_DATA = 'GET_SHOPKEEPER_DATA';
export const SAVE_SHOPKEEPER_DATA = 'SAVE_SHOPKEEPER_DATA';
export const CHANGE_PRODUCTS_CATEGORY = 'CHANGE_PRODUCTS_CATEGORY';
export const CLEAR_SHOPKEEPER_DATA = 'CLEAR_SHOPKEEPER_DATA';
export const SET_NOT_MATCH = 'SET_NOT_MATCH';

// action creators
export const saveSearchHomeData = (results, region, category) => ({
  type: SAVE_SEARCH_HOME_DATA,
  results,
  region,
  category,
});

export const getShopkeeperData = (shopkeeperId) => ({
  type: GET_SHOPKEEPER_DATA,
  shopkeeperId,
});

export const saveShopkeeperData = (shopkeeper) => ({
  type: SAVE_SHOPKEEPER_DATA,
  shopkeeper,
});

export const changeProductsCategory = (productsCategoryId) => ({
  type: CHANGE_PRODUCTS_CATEGORY,
  productsCategoryId,
});

export const clearShopkeeperData = () => ({
  type: CLEAR_SHOPKEEPER_DATA,
});

export const setNotMatch = () => ({
  type: SET_NOT_MATCH,
});
