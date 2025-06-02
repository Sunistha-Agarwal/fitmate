require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

//express app
const app = express()

//allow cros origin sharing
app.use(cors({origin: 'http://localhost:5173'}))

//middleware
app.use(express.json())
//this attaches the request json body to the req parameter

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()//ye jo hai wo control ko aage bhejega otherwise ye use hone ke bas control age nhi jaega
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

//connect to db
const connectDB = async() => {
    try {
       const response = await mongoose.connect(process.env.MONGO_URI)
       console.log('connection successful',response.connection.name)

       //listen for requests
        app.listen(process.env.PORT,()=>{
            console.log(`listening on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.log('connection failed',error.message)
    }
}

connectDB()

// //listen for requests
// app.listen(process.env.PORT,()=>{
//     console.log(`listening on port ${process.env.PORT}`)
// })