import { useAuth } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "logout" });
  };

  return logout
};
