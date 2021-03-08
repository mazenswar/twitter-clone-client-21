import React, { createContext, useReducer } from 'react';

export const createDataContext = (reducer, actions, initialState) => {
  const Context = createContext(reducer);
  const Provider = ({ children }) => {
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Provider value={state}>{children}</Provider>;
  };
  return { Context, Provider };
};
