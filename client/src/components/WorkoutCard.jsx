import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useWorkoutContext } from "../hooks/useWorkout";
import { useAuth } from "../hooks/useAuthContext";
import { useState } from "react";
import axios from "axios";

const WorkoutCard = ({ workout }) => {
  const useWorkout = useWorkoutContext();
  const { user } = useAuth();
  const token = user?.token;
  const [error, setError] = useState();

  const handleSubmit = async () => {
    try {
      await toast.promise(
        axios.delete("/api/workouts/" + workout._id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Deleting workout",
          success: "Workout deleted successfully",
          error: "Oops! Something went wrong",
        }
      );

      useWorkout.dispatch({
        type: "delete",
        payload: workout._id,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="shadow-sm hover:shadow-md p-4 bg-light-gray rounded-xl">
      <div className="flex justify-between">
        <div>
          <h4 className="text-green font-bold text-xl">{workout.title}</h4>
          <p>
            <strong>Load (kg):</strong>
            {workout.load}
          </p>
          <p>
            <strong>Reps :</strong>
            {workout.reps}
          </p>
        </div>
        <div className="">
          <button
            className="opacity-50 hover:opacity-100 hover:shadow-md p-1"
            onClick={handleSubmit}
          >
            <Trash2 color="black" />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default WorkoutCard;
