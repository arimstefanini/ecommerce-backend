import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        username:{type: String, required: true, unique: true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        isAdmin:{
            type: Boolean, 
            default:false
        },
    },
    { timestamps:true }
);

export const UserSchema = model("User", schema)