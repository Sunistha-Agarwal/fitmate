import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
      };
    case "logout":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });

  return <AuthContext.Provider value={{...state, dispatch}}>{props.children}</AuthContext.Provider>;
};
