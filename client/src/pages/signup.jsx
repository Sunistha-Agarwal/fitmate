import { useSignup } from "../hooks/useSignUp";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { signup, error, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (signUpInfo) => {
    await signup(signUpInfo);
    reset()
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="max-w-md shadow-md p-4 m-8 rounded-xl hover:shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-green font-semibold text-lg">Sign Up</p>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-lg">
                Email
              </label>
              <input
                type="email"
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
                type="password"
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
              disabled={isLoading}
            >
              Sign Up
            </button>
          </form>
          {error && (
            <div className="bg-red-200 border border-red-700 rounded-lg p-1 m-2">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
