
import mongoose from "mongoose";
const promise= mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.wygtiqc.mongodb.net/userdb?retryWrites=true&w=majority`);
promise.then(()=>{
  console.log("mongodb connection created")
}).catch((err?:Error)=>{
  console.log("connection not created!!")
})

export default mongoose