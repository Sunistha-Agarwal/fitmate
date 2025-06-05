const Workout = require('../models/workoutModel')

const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async(req,res) => {

    try {
        const id = req.user._id;
        const workouts = await Workout.find({user: id}).sort({createdAt : 1})

        if(!workouts){
            res.status(404).json({
                status: 404,
                message: "workouts not found"
            })
        }

        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "internal server error"
        })
    }
}

//get one workout
const getWorkoutById = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({error:"Invalid id"}) 
    }

    try {
         const workout = await Workout.findById(id)

        if(!workout){
            return res.status(404).json({error:"workout not found"})
        }

        res.status(200).json(workout)   
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

//add a new workout
const createWorkout = async (req,res) => {
    const { title , load , reps } = req.body
    const user = req.user._id
    try {
        const workout = await Workout.create({title, load, reps, user})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//update a workout
const updateWorkout = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "bad request"})
    }

    try {
        const {title, load, reps} = req.body
        const updateWorkout = await Workout.findByIdAndUpdate(
            id,
            { title, load, reps},
            {new: true, runValidators:true}
        )

        if(!updateWorkout){
            res.status(404).json({
                status: 404,
                message: "workout not found"
            })
        }

        res.status(200).json({
            status: 200,
            data: updateWorkout
        })

    } catch (error) {
        res.status(500).json({
            status:500,
            error: error.message
        })
    }
}

//delete a workout
const deleteWorkout =  async ( req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({error:"Invalid id"}) 
    }

    try {
        const workout = await Workout.findByIdAndDelete(id)

        if(!workout){
            return res.status(404).json({error:"workout not found"})
        }

        res.status(200).json(workout)   
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

module.exports = {
    getWorkouts,
    getWorkoutById,    
    createWorkout,
    updateWorkout,
    deleteWorkout
};