import {
  SAVE_USER,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
} from '../actions/profil';

const initialState = {
  // Display Loader
  loader: true,
  // API User Data
  userId: null,
  userRole: [],
  userData: {},
};

const profilReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        userId: action.id,
        userRole: action.userRole,
      };

    case SAVE_USER_DATA:
      return {
        ...state,
        userData: action.userData,
        loader: false,
      };

    case CLEAR_USER_DATA:
      return {
        ...state,
        userData: {},
        loader: true,
      };

    default: return state;
  }
};

export default profilReducer;
