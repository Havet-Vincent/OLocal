import {
  SAVE_USER,
  SAVE_USER_DATA,
  SET_LOGO_PICTURE,
  SET_PROFIL_FIELD_VALUE,
  SET_FIELD_VALUE,
  GET_CATALOG,
  SAVE_SUPLIERS_BY_REGION,
  TOOGLE_SUPPLIER_FORM,
  SET_LOADER_SUPPLIER_FORM,
  ADD_LOCAL_SUPPLIER,
  CLEAR_USER_DATA,
} from '../actions/profil';

// == Import API config for pictures base URL
const server = require('src/api.config.json');

const initialState = {
  // Display Profil Loader
  loaderUser: true,
  loaderProfil: true,
  loaderProfilPage: true,
  // API User Data
  userId: null,
  userRole: [],
  userData: {},
  newEmail: '',
  logoPicture: '',
  catalog: [],
  suppliers: [],
  // LocalSupplier add form
  loaderAddSupplier: false,
  openSupplierForm: false,
  supplierRegion: null,
  siret: '',
};

const profilReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        userId: action.id,
        userRole: action.userRole,
        loaderUser: false,
      };

    case GET_CATALOG: {
      const catalog = state.userData.catalogs.map((item) => (
        {
          catalogId: item.id,
          categoryId: item.product.category.id,
          category: item.product.category.name,
          product: item.product.name,
          supplierId: item.localSupplier !== null ? item.localSupplier.id : '',
          supplier: item.localSupplier !== null ? item.localSupplier.name : '',
          city: item.localSupplier !== null ? item.localSupplier.city : '',
          postalCode: item.localSupplier !== null ? item.localSupplier.postalCode : '',
        }
      ));
      return {
        ...state,
        catalog,
        loaderProfilPage: false,
      };
    }

    case SAVE_USER_DATA:
      return {
        ...state,
        userData: {
          ...action.userData,
          password: '',
        },
        newEmail: action.userData.email,
        logoPicture: `${server.url}:${server.port}/${action.userData.logoPicture}`,
        loaderProfil: false,
        loaderProfilPage: false,
        supplierRegion: action.userData.region.id,
      };

    case SET_LOGO_PICTURE:
      return {
        ...state,
        userData: {
          ...state.userData,
          logoPicture: action.newLogoPicture,
        },
        logoPicture: action.newLogoPicture,
      };

    case SET_PROFIL_FIELD_VALUE: {
      if (action.name === 'email') {
        return {
          ...state,
          newEmail: action.value,
        };
      }
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.name]: action.value,
        },
      };
    }

    case SET_FIELD_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SAVE_SUPLIERS_BY_REGION:
      return {
        ...state,
        suppliers: action.suppliers,
      };

    case TOOGLE_SUPPLIER_FORM:
      return {
        ...state,
        openSupplierForm: !state.openSupplierForm,
        loaderAddSupplier: false,
        siret: '',
      };

    case SET_LOADER_SUPPLIER_FORM:
      return {
        ...state,
        loaderAddSupplier: action.value,
      };

    case ADD_LOCAL_SUPPLIER:
      return {
        ...state,
        loaderAddSupplier: true,
      };

    case CLEAR_USER_DATA:
      return {
        ...state,
        // Display Profil Loader
        loaderProfil: true,
        loaderProfilPage: true,
        // API User Data
        userId: null,
        userRole: [],
        userData: {},
        logoPicture: '',
        catalog: [],
        suppliers: [],
        // LocalSupplier add form
        loaderAddSupplier: false,
        openSupplierForm: false,
        supplierRegion: null,
        siret: '',
      };


    default: return state;
  }
};

export default profilReducer;
