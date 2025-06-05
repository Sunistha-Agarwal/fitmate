import { useEffect, useState } from "react";
import axios from "axios";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkout";
import { useAuth } from "../hooks/useAuthContext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuth();
  const token = user?.token;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          dispatch({
            type: "set",
            payload: response.data,
          });
        }
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };

    fetchWorkouts();
  }, [dispatch]);
  //whenever the dispatch function changes this useEffect also runs i.e everytime a workout is added or deleted the set function also runs

  return (
    <>
      <div className="md:grid md:grid-cols-[2fr_1fr]">
        <div className="p-4 mx-8 mt-8 max-w-5xl hover:shadow-md rounded-2xl">
          <div className="grid grid-cols-1 gap-4">
            {workouts &&
              workouts.map((workout) => {
                return <WorkoutCard key={workout._id} workout={workout} />;
              })}
          </div>
        </div>
        <div>
          <WorkoutForm />
        </div>
        <p>{error}</p>
      </div>
    </>
  );
}
