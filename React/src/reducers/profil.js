import {
  SAVE_USER,
} from '../actions/profil';

const initialState = {
  userId: '',
  userRole: [],
  userData: null,
};

const profilReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        userId: action.id,
        userRole: action.userRole,
      };

    default: return state;
  }
};

export default profilReducer;
