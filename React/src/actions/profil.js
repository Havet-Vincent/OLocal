// action types
export const FETCH_USER = 'FETCH_USER';
export const SAVE_USER = 'SAVE_USER';
export const GET_PROFIL = 'GET_PROFIL';
export const GET_PROFIL_PAGE = 'GET_PROFIL_PAGE';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';
export const GET_USER_DATA = 'GET_USER_DATA';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const SET_LOGO_PICTURE = 'SET_LOGO_PICTURE';
export const SET_LOGO_PICTURE_ERROR = 'SET_LOGO_PICTURE_ERROR';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const DELETE_USER_ACCOUNT = 'DELETE_USER_ACCOUNT';
export const SET_PROFIL_FIELD_VALUE = 'SET_PROFIL_FIELD_VALUE';
export const SET_FIELD_ERROR = 'SET_FIELD_ERROR';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

// ====== Shopkeeper Profil Page
export const GET_CATALOG = 'GET_CATALOG';
export const ADD_CATALOG_ITEM = 'ADD_CATALOG_ITEM';
export const DELETE_CATALOG_ITEM = 'DELETE_CATALOG_ITEM';
export const UPDATE_CATALOG_ITEM = 'UPDATE_CATALOG_ITEM';
export const GET_SUPPLIERS_BY_REGION = 'GET_SUPPLIERS_BY_REGION';
export const SAVE_SUPLIERS_BY_REGION = 'SAVE_SUPLIERS_BY_REGION';
export const HANDLE_SUPPLIER_SUBMIT = 'HANDLE_SUPPLIER_SUBMIT';


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

export const setActivePage = (newValue) => ({
  type: SET_ACTIVE_PAGE,
  newValue,
});

export const getUserData = () => ({
  type: GET_USER_DATA,
});

export const saveUserData = (userData) => ({
  type: SAVE_USER_DATA,
  userData,
});

export const setLogoPicture = (newLogoPicture) => ({
  type: SET_LOGO_PICTURE,
  newLogoPicture,
});

export const setLogoPictureError = (errorMsg) => ({
  type: SET_LOGO_PICTURE_ERROR,
  errorMsg,
});

export const updateUserData = (data) => ({
  type: UPDATE_USER_DATA,
  data,
});

export const setFieldError = (value) => ({
  type: SET_FIELD_ERROR,
  value,
});

export const setFieldValue = (name, value) => ({
  type: SET_PROFIL_FIELD_VALUE,
  name,
  value,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export const deleteUserAccount = () => ({
  type: DELETE_USER_ACCOUNT,
});


// ============== Shopkeeper Profil Page
export const getCatalog = () => ({
  type: GET_CATALOG,
});

export const addCatalogItem = (data) => ({
  type: ADD_CATALOG_ITEM,
  data,
});

export const deleteCatalogItem = (data) => ({
  type: DELETE_CATALOG_ITEM,
  data,
});

export const updateCatalogItem = (data) => ({
  type: UPDATE_CATALOG_ITEM,
  data,
});

export const getSuppliersByRegion = () => ({
  type: GET_SUPPLIERS_BY_REGION,
});

export const saveSuppliersByRegion = (suppliers) => ({
  type: SAVE_SUPLIERS_BY_REGION,
  suppliers,
});

export const handleSupplierSubmit = () => ({
  type: HANDLE_SUPPLIER_SUBMIT,
});
