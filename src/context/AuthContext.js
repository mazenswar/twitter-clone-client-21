import { createDataContext } from './createDataContext';
import API from '../API_CONSTANTS';
import twitterAPI from '../api/twitter';

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'set_user':
      return { user: payload, errorMessage: null };
    case 'logout':
      return { user: null, errorMessage: null };
    case 'set_error':
      return { ...state, errorMessage: payload };
    case 'clear_errors':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

//////

const tryLocalSignin = (dispatch) => async () => {
  try {
    const response = await twitterAPI.get(API.PERSIST_URL, {
      headers: { Authorization: `bearer ${localStorage.token}` },
    });
    dispatch({ type: 'set_user', payload: response.data });
  } catch (e) {
    dispatch({ type: 'set_error', payload: e });
  }
};

const createOrLoginUser = (dispatch) => async ({ email, password, login }) => {
  const url = login ? API.LOGIN_URL : API.USERS_URL;
  try {
    const response = await twitterAPI.post(url, {
      data: { email, password },
    });
    dispatch({ type: 'set_user', payload: response.data });
  } catch (e) {
    dispatch({ type: 'set_error', payload: e });
  }
};

const deleteUserFromDB = (dispatch) => async (id) => {
  try {
    await twitterAPI.delete(`${API.USERS_URL}/${id}`);
    localStorage.clear();
    dispatch({ type: 'logout' });
  } catch (e) {
    dispatch({ type: 'set_error', payload: e });
  }
};

const updateUserToDB = (dispatch) => async (user) => {
  try {
    const response = await twitterAPI.patch(`${API.USERS_URL}/${user.id}`);
    dispatch({ type: 'set_user', payload: response.data });
  } catch (e) {}
};

// const newUserToDB = (dispatch) => (user) => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accepts: 'application/json',
//     },
//     body: JSON.stringify(user),
//   };
//   fetch(API.USERS_URL, config)
//     .then((r) => r.json())
//     .then((data) => {
//       dispatch({ type: 'set_user', payload: data.user });
//       localStorage.token = data.token;
//     });
// };

// const loginUserToDB = (dispatch) => (user) => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accepts: 'application/json',
//     },
//     body: JSON.stringify(user),
//   };
//   fetch(API.LOGIN_URL, config)
//     .then((r) => r.json())
//     .then((data) => {
//       dispatch({ type: 'set_user', payload: data.user });
//       localStorage.token = data.token;
//     });
// };

// const persistUserFromDB = (dispatch) => () => {
//   const config = {
//     headers: {
//       Authorization: 'bearer ' + localStorage.token,
//     },
//   };
//   fetch(API.PERSIST_URL, config)
//     .then((r) => r.json())
//     .then((user) => {
//       dispatch({ type: 'set_user', payload: user });
//     });
// };

// const updateUserToDB = (dispatch) => (user) => {
//   const config = {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify(user),
//   };
//   return fetch(`${API.USERS_URL}/${user.id}`, config)
//     .then((r) => r.json())
//     .then((user) => {
//       dispatch({ type: 'set_user', payload: user });
//     });
// };

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    tryLocalSignin,
    createOrLoginUser,
    deleteUserFromDB,
    updateUserToDB,
  },
  {
    user: null,
    errorMessage: null,
  }
);
