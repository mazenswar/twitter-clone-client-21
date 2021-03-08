import { createDataContext } from './createDataContext';

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'login':
      return { token: payload, errorMessage: null };
    case 'logout':
      return { token: null, errorMessage: null };
    case 'set_error':
      return { ...state, errorMessage: payload };
    case 'clear_errors':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

const persistUser = (dispatch) => () => {
  let token;
  if (token) {
    dispatch({ type: 'login', payload: token });
  }
};
