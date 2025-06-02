import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
    const useWorkout = useContext(WorkoutContext);

    return useWorkout
}