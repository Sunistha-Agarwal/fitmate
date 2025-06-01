import { useEffect } from "react"
import axios from "axios"
import WorkoutCard from "../components/WorkoutCard"
import { useWorkoutContext } from "../hooks/useWorkout"

export default function Home() {
    const {workouts, dispatch} = useWorkoutContext()

    axios.defaults.baseURL=import.meta.env.VITE_Base_URL

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('/api/workouts')

                console.log(response)
                
                if(response.status === 200){
                    dispatch({
                        type:'set',
                        payload: response.data
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchWorkouts()
    },[dispatch])
    //whenever the dispatch function changes this useEffect also runs i.e everytime a workout is added or deleted the set function also runs

    return(
        <>
            <div className="p-4 mx-8 mt-8 max-w-5xl hover:shadow-md rounded-2xl">
                <div className="grid grid-cols-1 gap-4">
                    {workouts && workouts.map((workout) => (
                        <WorkoutCard key={workout._id} workout={workout}/>
                    ))}
                </div>
            </div>
        </>
    )
}