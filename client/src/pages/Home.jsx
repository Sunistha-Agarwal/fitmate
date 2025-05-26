import { useEffect,useState } from "react"
import axios from "axios"
import WorkoutCard from "../components/WorkoutCard"

export default function Home() {

    axios.defaults.baseURL='http://localhost:4000'

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
            <div>
                <div>
                    {workouts && workouts.map((workout) => (
                        <WorkoutCard key={workout._id} workout={workout}/>
                    ))}
                </div>
            </div>
        </>
    )
}