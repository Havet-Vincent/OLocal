// action types
export const FETCH_USER = 'FETCH_USER';
export const SAVE_USER = 'SAVE_USER';
export const GET_PROFIL = 'GET_PROFIL';
export const GET_PROFIL_PAGE = 'GET_PROFIL_PAGE';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_CATALOG = 'GET_CATALOG';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const DELETE_CATALOG_ITEM = 'DELETE_CATALOG_ITEM';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

// action creators
export const fetchUser = (username) => ({
  type: FETCH_USER,
  username,
});

export const saveUser = (id, userRole) => ({
  type: SAVE_USER,
  id,
  userRole,
});

export const getProfil = () => ({
  type: GET_PROFIL,
});

export const getProfilPage = () => ({
  type: GET_PROFIL_PAGE,
});

export const getUserData = () => ({
  type: GET_USER_DATA,
});

export const saveUserData = (userData) => ({
  type: SAVE_USER_DATA,
  userData,
});

export const getCatalog = () => ({
  type: GET_CATALOG,
});

export const deleteCatalogItem = (data) => ({
  type: DELETE_CATALOG_ITEM,
  data,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
