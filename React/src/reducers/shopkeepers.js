import { getUniqueCategories, getProductsByCategory } from 'src/utils/selectors';
import {
  SAVE_SEARCH_HOME_DATA,
  SAVE_SHOPKEEPER_DATA,
  CHANGE_PRODUCTS_CATEGORY,
} from '../actions/shopkeepers';

const initialState = {
  // Display Loader
  loader: true,
  // API Home Search results Data
  currentCategory: {},
  currentRegion: {},
  searchResults: [],
  // API Shopkeeper Data
  shopkeeper: {},
  // Shopkeeper details page data
  products: [],
  productsCategoryId: null,
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
        productsCategoryId: action.category.id,
      };

    case SAVE_SHOPKEEPER_DATA: {
      // Filter unique categories for page Select
      const categories = action.shopkeeper.catalogs.map((catalog) => (
        catalog.product.category
      ));
      const uniqueCategories = getUniqueCategories(categories);

      // Build products list infos for page
      const products = action.shopkeeper.catalogs.map((catalog) => ({
        ...catalog.product,
        localSupplier: catalog.localSupplier,
      }));

      if (Object.keys(state.currentCategory).length === 0) {
        const productsCategoryId = uniqueCategories[0].id;
        // Filter products for first category to display
        const productsByCategory = getProductsByCategory(products, productsCategoryId);
        return {
          ...state,
          shopkeeper: action.shopkeeper,
          products,
          productsCategoryId,
          uniqueCategories,
          productsByCategory,
          loader: false,
        };
      }

      // Find products in unique categories list for home search selected category
      const productsInCategory = uniqueCategories.find((item) => (
        item.name === state.currentCategory.name
      ));
      // Filter products for home search selected category
      const productsByCategory = getProductsByCategory(products, productsInCategory.id);
      return {
        ...state,
        shopkeeper: action.shopkeeper,
        products,
        productsCategoryId: productsInCategory.id,
        uniqueCategories,
        productsByCategory,
        loader: false,
      };
    }

    case CHANGE_PRODUCTS_CATEGORY: {
      const productsByCategory = getProductsByCategory(state.products, action.productsCategoryId);
      return {
        ...state,
        productsCategoryId: action.productsCategoryId,
        productsByCategory,
      };
    }

    default: return state;
  }
};

export default shopkeepersReducer;
