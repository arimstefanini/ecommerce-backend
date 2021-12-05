import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        title:{type: String, required: true, unique: true},
        desc:{type:String, required:true},
        img:{type:String, required:true},
        categories:{type:Array},
        size:{type:Array},
        color:{type:Array},
        price:{type:Number, required:true},
        inStock:{type:Boolean, default:true}
    },
    { timestamps:true }
);

export const ProductSchema = model("Product", schema)
