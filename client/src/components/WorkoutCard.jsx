const WorkoutCard = ({workout}) => {
    return(
        <div>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps :</strong>{workout.reps}</p>
        </div>
    )
}

export default WorkoutCard