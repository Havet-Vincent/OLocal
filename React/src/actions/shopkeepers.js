// action types
export const SAVE_SEARCH_HOME_DATA= 'SAVE_SEARCH_HOME_DATA';

// action creators
export const saveSearchHomeData = (results, region, category) => ({
  type: SAVE_SEARCH_HOME_DATA,
  results,
  region,
  category,
});



