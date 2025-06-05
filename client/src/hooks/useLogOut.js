import { useAuth } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkout";

export const useLogout = () => {
  const { dispatch } = useAuth();
  const {dispatch: dispatchWorkout} = useWorkoutContext()

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "logout" });
    dispatchWorkout({
      type: 'set',
      payload : null
    })
  };

  return logout
};
