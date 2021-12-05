import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        userId:{type: String, required: true},
        products:[
            {
                productId:{
                    type:String
                },
                quantity:{
                    type: Number,
                    default: 1
                }
            }
        ]
        
    },
    { timestamps: true }
);

export const CartSchema = model("Cart", schema)
