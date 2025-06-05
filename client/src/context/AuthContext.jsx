import { createContext, useEffect, useReducer } from "react";

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
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  })(),
});

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
