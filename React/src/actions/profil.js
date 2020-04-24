// action types
export const FETCH_USER = 'FETCH_USER';
export const SAVE_USER = 'SAVE_USER';
export const GET_PROFIL = 'GET_PROFIL';
export const GET_PROFIL_PAGE = 'GET_PROFIL_PAGE';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_CATALOG = 'GET_CATALOG';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const DELETE_CATALOG_ITEM = 'DELETE_CATALOG_ITEM';
export const UPDATE_CATALOG_ITEM = 'UPDATE_CATALOG_ITEM';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const SET_REGION = 'SET_REGION';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const HANDLE_SUPPLIER_SUBMIT = 'HANDLE_SUPPLIER_SUBMIT';
export const ADD_CATALOG_ITEM = 'ADD_CATALOG_ITEM';
export const GET_SUPPLIERS_BY_REGION = 'GET_SUPPLIERS_BY_REGION ';
export const SAVE_SUPLIERS_BY_REGION = 'SAVE_SUPLIERS_BY_REGION ';



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

export const updateCatalogItem = (data) => ({
  type: UPDATE_CATALOG_ITEM,
  data,
});

export const addCatalogItem = (data) => ({
  type: ADD_CATALOG_ITEM,
  data,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export const setRegion = (value) => ({
  type: SET_REGION,
  value,
});

export const setFieldValue = (name, value) => ({
  type: SET_FIELD_VALUE,
  name,
  value,
});

export const handleSupplierSubmit = () => ({
  type: HANDLE_SUPPLIER_SUBMIT,
});

// partie ajout product
export const getSuppliersByRegion = () => ({
  type: GET_SUPPLIERS_BY_REGION,
});

export const saveSuppliersByRegion = (suppliers) => ({
  type: SAVE_SUPLIERS_BY_REGION,
  suppliers,
});
