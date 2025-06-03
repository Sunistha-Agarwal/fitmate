import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "set":
      return {
        workouts: action.payload,
      };
    case "add": {
      console.log("the context is connected");
      return {
        workouts: [action.payload, ...state.workouts],
      };
    }
    case "delete": {
      return {
        workouts: state.workouts.filter((work) => work._id !== action.payload),
      };
    }
    default:
      throw Error("Unknown action");
  }
};

export const WorkoutContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ dispatch, ...state }}>
      {props.children}
    </WorkoutContext.Provider>
  );
};
