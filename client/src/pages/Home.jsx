import { useEffect,useState } from "react"
import axios from "axios"
import WorkoutCard from "../components/WorkoutCard"

export default function Home() {

    axios.defaults.baseURL=import.meta.env.VITE_Base_URL

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('/api/workouts')
                
                if(response.status === 200){
                    setWorkouts(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchWorkouts()
    },[])

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