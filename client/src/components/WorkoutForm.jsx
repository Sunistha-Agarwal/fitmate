import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function WorkoutForm() {
  const [error, setError] = useState(null);

  axios.defaults.baseURL = import.meta.env.VITE_Base_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (workout) => {
    try {
      await toast.promise(axios.post("/api/workouts/", workout), {
        loading: "adding workout",
        success: "Workout added successfully",
        error: "OOPS! Something went wrong.",
      });
      reset();
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
        reset();
      }, 1500);
    }
  };

  return (
    <>
      {/*  here the handle submit  is a submithandler of react-hook-form when submit button is clicked it checks for all the validations and calls our callback submit function only if all the things are fine */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl shadow-md p-4 m-8 rounded-xl hover:shadow-lg"
      >
        <div>
          <label htmlFor="title" className="font-bold text-lg">
            Workout Name:
          </label>
          <input
            type="text"
            id="title"
            className="bg-white m-4 p-2 rounded-lg shadow-sm hover:shadow-md active:shadow-md"
            {...register("title", {
              required: "title is required",
            })}
          />
          {errors.title && (
            <p className="text-red-700">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="load" className="font-bold text-lg">
            Load:
          </label>
          <input
            type="number"
            id="load"
            className="bg-white m-4 p-2 rounded-lg shadow-sm hover:shadow-md active:shadow-md"
            {...register("load", {
              required: "load is required",
              pattern: {
                value: /\d/,
                message: "load can be numeral only",
              },
            })}
          />
          {errors.load && <p className="text-red-700">{errors.load.message}</p>}
        </div>
        <div>
          <label htmlFor="reps" className="font-bold text-lg">
            Reps:
          </label>
          <input
            type="number"
            id="reps"
            className="bg-white m-4 p-2 rounded-lg shadow-sm hover:shadow-md active:shadow-md"
            {...register("reps", {
              required: "reps is required",
              pattern: {
                value: /\d/,
                message: "reps can be numeral only",
              },
            })}
          />
          {errors.reps && <p className="text-red-700">{errors.reps.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-green rounded-full px-6 py-1.5 text-white font-semibold hover:opacity-80"
        >
          Add Workout
        </button>
        {error && (
          <div className="bg-red-200 border border-red-700 rounded-lg p-1">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </form>
    </>
  );
}
