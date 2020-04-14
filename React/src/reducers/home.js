import {
  SAVE_REGIONS_DATA,
  SAVE_CATEGORIES_DATA,
  SET_REGION_FIELD,
  SET_CATEGORY_FIELD,
} from '../actions/home';

const initialState = {
  // API Data
  regions: [],
  categories: [],
  // Select Input Field value
  categoryField: '',
  regionField: '',

  // Display Home Loader
  loadingRegions: true,
  loadingCategories: true,
};

const homeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_REGIONS_DATA:
      return {
        ...state,
        regions: action.regions,
        loadingRegions: false,
      };

    case SAVE_CATEGORIES_DATA:
      return {
        ...state,
        categories: action.categories,
        loadingCategories: false,
      };

    case SET_REGION_FIELD:
      return {
        ...state,
        regionField: action.id,
      };

    case SET_CATEGORY_FIELD:
      return {
        ...state,
        categoryField: action.id,
      };

    default: return state;
  }
};

export default homeReducer;
