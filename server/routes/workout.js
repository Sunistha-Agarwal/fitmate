const express = require("express");

const Workout = require("../models/workoutModel");
const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controller/workoutController");

const router = express.Router();

router.get("/", getWorkouts);

router.get("/:id", getWorkoutById);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
