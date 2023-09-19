// import  mongoose,{Schema} from "mongoose";
import mongoose from "../connection.js";
import { SchemaTypes } from "mongoose";
const schema =mongoose.Schema
const userSchema = new schema({
    'id':{type:SchemaTypes.String, required:true},
    'email':{type:SchemaTypes.String, required:true},
    'password':{type:SchemaTypes.String, required:true, minLength:6, maxLength:100},
    'name':{type:SchemaTypes.String, required:true}
})


export const userModel = mongoose.models.users || mongoose.model('users', userSchema);
const userGoogleSchema = new schema({
    'id':{type:SchemaTypes.String, required:true},
    'email':{type:SchemaTypes.String, required:true},
    'name':{type:SchemaTypes.String, required:true},
    'image':{type:SchemaTypes.String,required:true}
})
export const userGoogleModel = mongoose.models.usersgoogle || mongoose.model('usersgoogle', userGoogleSchema);