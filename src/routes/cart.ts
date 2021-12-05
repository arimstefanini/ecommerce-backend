
import { Router } from "express";
import {CartSchema} from "../models/Cart";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken";
const router = Router();

//CREATE
router.post("/", verifyToken, async (req:any, res:any)=>{
    const newCart = new CartSchema(req.body)

    try{
        const saveCart = await newCart.save();
        res.status(200).json(saveCart)
    }catch(err){
        res.status(500).json(err)
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req:any, res:any)=>{
    try{
        const updatCart = await CartSchema.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            { new:true }
        );
        res.status(200).json(updatCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req:any,res:any)=>{
    try{
        await CartSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart deletado...");
    } catch(err){
        res.status(500).json(err);
    }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const cart = await CartSchema.find({userId: req.params.userId});
        res.status(200).json(cart);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET ALL 
router.get("/", verifyTokenAndAdmin,async (req,res)=>{
    try{
        const carts = await CartSchema.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
});

export {router as cartRoute}
