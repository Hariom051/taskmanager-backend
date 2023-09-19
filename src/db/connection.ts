
import mongoose from "mongoose";
const promise= mongoose.connect(process.env.MONGOURL as string);
promise.then(()=>{
  console.log("mongodb connection created")
}).catch((err?:Error)=>{
  console.log("connection not created!!")
})

export default mongoose