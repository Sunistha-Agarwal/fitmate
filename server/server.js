require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')
const authMiddleware = require('./middleware/auth.middleware')

//express app
const app = express()

//allow cros origin sharing
app.use(cors({origin: 'http://localhost:5173'}))
app.use(cors({origin: 'fitmate-9ud0cqo5h-sunista-agarwals-projects.vercel.app'}))

//middleware
app.use(express.json())
//this attaches the request json body to the req parameter

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()//ye jo hai wo control ko aage bhejega otherwise ye use hone ke bas control age nhi jaega
})

//these routes are public for signup and login
app.use('/api/user',userRoutes)

//these routes are protected and can be accessed by authenticated users only
app.use('/api/workouts',  authMiddleware, workoutRoutes)

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