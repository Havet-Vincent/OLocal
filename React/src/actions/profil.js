// action types
export const FETCH_USER = 'FETCH_USER';
export const SAVE_USER = 'SAVE_USER';

// action creators
export const fetchUser = (username) => ({
  type: FETCH_USER,
  username,
});

export const saveUser = (id, userRole) => ({
  type: SAVE_USER,
  id,
  userRole,
});
