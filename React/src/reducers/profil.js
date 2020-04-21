import {
  SAVE_USER,
  SAVE_USER_DATA,
  GET_CATALOG,
  CLEAR_USER_DATA,
} from '../actions/profil';

const initialState = {
  // Display Loader
  loaderUser: true,
  loaderProfil: true,
  loaderProfilPage: true,
  // API User Data
  userId: null,
  userRole: [],
  userData: {},
  catalog: [],
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
          supplierId: item.localSupplier.id,
          supplier: item.localSupplier.name,
          city: item.localSupplier.city,
          postalCode: item.localSupplier.postalCode,
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
        userData: action.userData,
        loaderProfil: false,
        loaderProfilPage: false,
      };

    case CLEAR_USER_DATA:
      return {
        ...state,
        userId: null,
        userRole: [],
        userData: {},
        catalog: [],
        loaderProfil: true,
        loaderProfilPage: true,
      };

    default: return state;
  }
};

export default profilReducer;
