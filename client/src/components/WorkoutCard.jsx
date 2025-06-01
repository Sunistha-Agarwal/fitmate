import { Trash2 } from "lucide-react";
import axios from "axios"
import {toast} from "react-hot-toast"
import { useWorkoutContext } from "../hooks/useWorkout";

const WorkoutCard = ({ workout }) => {
  const useWorkout = useWorkoutContext()
  axios.defaults.baseURL = import.meta.env.VITE_Base_URL;

  const handleSubmit = async () => {
    try {
     await toast.promise(axios.delete("/api/workouts/"+ workout._id ),{
      loading:"Deleting workout",
      success:"Workout deleted successfully",
      error:"Oops! Something went wrong"
     })
     
      useWorkout.dispatch({
        type: 'delete',
        payload: workout._id
      })
    } catch (error) {
      
    }
  }

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
    </div>
  );
};

export default WorkoutCard;
