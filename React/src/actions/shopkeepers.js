// action types
export const SAVE_SEARCH_HOME_DATA= 'SAVE_SEARCH_HOME_DATA';

// action creators
export const saveSearchHomeData = (results) => ({
  type: SAVE_SEARCH_HOME_DATA,
  results,
});

