import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuth();

  const signup = async (signupInfo) => {
    try {
        setIsLoading(true)

      const response = await toast.promise(
        axios.post("/api/user/signup", signupInfo),
        {
          loading: "Signing Up...",
          success: "Sign Up succesful",
          error: "OOPS! Something went wrong.",
        }
      );

      setIsLoading(false)

      setError(null);
      const user = response.data;

      //store the item in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      //update the auth context
      dispatch({ type: "login", payload: user });
    } catch (error) {
      setError(error.response?.data?.error);
      setIsLoading(false)
    }
  };

  return { signup, error, isLoading };
};
