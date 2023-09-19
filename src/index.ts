import express, { Application } from 'express';
const app: Application = express();
app.use(express.json());
import  cookieParser from 'cookie-parser';
import 'dotenv/config'
import { userRoutes } from './routes/userRoutes.js';
import { taskRoutes } from './routes/taskRoutes.js';
import cors from "cors";

const corsOptions = {
  origin: "https://taskmanager-client.vercel.app", // Replace with the actual URL of your frontend
  credentials: true, // Enable cookies with credentials
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/",userRoutes);
app.use("/",taskRoutes)


const port = process.env.PORT || 1234;
app.listen(port,(err?:Error)=>{
  if(err)
  {
    console.log("server crashed!!!",err.message)
  }
  else
  {
    console.log("Server started @",port)
  }
   
})