import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoute from './routes/auth.js'
import courseRoute from './routes/courses.js'
//import userRoute from './routes/users.js'
const app = express()
dotenv.config()


const connect = async()=>{
    try{
        await mongoose.connect(process.env.db)
        console.log("Connected to db");
    }catch(err){
        console.log(err)
    }
}

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoute)
//app.use('/api/user', userRoute)
app.use('/api/course', courseRoute)

app.listen(3001, ()=>{
    connect();
    console.log("Connected to application backend")
});