import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast'
import { useState } from "react";
import axios from "axios";

export default function LogIn() {
  const[error, setError] = useState()
  const { register, handleSubmit, formState: {errors} } = useForm();

  axios.defaults.baseURL = import.meta.env.VITE_Base_URL;

  const onSubmit = async (user) => {
    try {
      const response = await toast.promise(axios.post('/api/user/login', user),{
        loading: "Logging In...",
        success: "Logged In successfully",
        error: "OOPS! Something went wrong."
      })

      setError(null)
      const token = response.data
      console.log(token)
    } catch (error) {
      setError(error.response?.data?.error)
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="max-w-md shadow-md p-4 m-8 rounded-xl hover:shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-green font-semibold text-lg">Log In</p>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-lg">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="bg-white m-4 p-2 rounded-lg shadow-sm hover:shadow-md active:shadow-md"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-bold text-lg">
                Password
              </label>
              <input
                type="text"
                id="password"
                className="bg-white m-4 p-2 rounded-lg shadow-sm hover:shadow-md active:shadow-md"
                {...register("password", {
                  required: "Password is required.",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-green rounded-full px-6 py-1.5 text-white font-semibold hover:opacity-80"
            >
              Log In
            </button>
          </form>
          {error && (
          <div className="bg-red-200 border border-red-700 rounded-lg p-1">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
