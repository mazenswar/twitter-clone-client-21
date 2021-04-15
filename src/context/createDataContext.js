import React, { createContext, useReducer } from 'react';

export const createDataContext = (reducer, actions, initialState) => {
  const Context = createContext(reducer);
  const Provider = ({ children }) => {
    const boundActions = {};
    const [state, dispatch] = useReducer(reducer, initialState);
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
