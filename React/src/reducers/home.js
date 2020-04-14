import { SAVE_REGIONS_DATA } from '../actions/home';

const initialState = {
  regions: [],

  categories: [],

  loading: true,
};

const homeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_REGIONS_DATA:
      return {
        ...state,
        regions: action.regions,
        categories: action.categories,
      };

    default: return state;
  }
};

export default homeReducer;
