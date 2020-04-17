import {
  SAVE_SEARCH_HOME_DATA,
  SAVE_SHOPKEEPER_DATA,
} from '../actions/shopkeepers';
import { getUniqueCategories, getProductsByCategory } from 'src/utils/selectors';

const initialState = {
  // API Home Search results Data
  currentCategory: {},
  currentRegion: {},
  searchResults: [],
  // API Shopkeeper Data
  shopkeeper: {},
  uniqueCategories: [],
  productsByCategory: [],

};

const shopkeepersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_SEARCH_HOME_DATA:
      return {
        ...state,
        currentCategory: action.category,
        currentRegion: action.region,
        searchResults: action.results,
      };

    case SAVE_SHOPKEEPER_DATA: {
      // Filter unique categories for Select
      const categories = action.shopkeeper.catalogs.map((catalog) => {
        return catalog.product.category;
      });
      const uniqueCategories = getUniqueCategories(categories);
       // Filter products for selected category
      const products = action.shopkeeper.catalogs.map((catalog) => {
        return { ...catalog.product, localSupplier: catalog.localSupplier };
      });
      const productsByCategory = getProductsByCategory(products, state.currentCategory.id);

      return {
        ...state,
        shopkeeper: action.shopkeeper,
        uniqueCategories,
        productsByCategory,
      };
    };

    default: return state;
  }
};

export default shopkeepersReducer;
