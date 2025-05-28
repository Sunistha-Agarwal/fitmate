const WorkoutCard = ({ workout }) => {
  return (
    <div className="shadow-sm hover:shadow-md p-4 bg-light-gray rounded-xl">
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
  );
};

export default WorkoutCard;
