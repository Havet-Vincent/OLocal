/* eslint-disable import/prefer-default-export */
/**
 * Filter unique categories from shopkeepers products list
 * @param {Array} categories All categories
 * @return Array containing unique categories
 */
export const getUniqueCategories = (categories) => {
  let uniqueCategories = [...categories];
  const cache = {};
  // eslint-disable-next-line no-return-assign
  uniqueCategories = categories.filter((elem) => (
    cache[elem.id] ? 0 : cache[elem.id] = 1
  ));
  return uniqueCategories;
};

/**
 * Filter products for a given category
 * @param {Array} products All products
 * @param {Number} categoryId to filter products by
 * @return Array containing products for a given category
 */
export const getProductsByCategory = (products, categoryId) => (
  products.filter((product) => product.category.id === categoryId)
);
