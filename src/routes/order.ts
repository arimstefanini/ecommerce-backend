import { Router } from "express";
import {OrderSchema} from "../models/Order";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken";
const router = Router();

//CREATE
router.post("/", verifyToken, async (req:any, res:any)=>{
    const newOrder = new OrderSchema(req.body)

    try{
        const saveCart = await newOrder.save();
        res.status(200).json(saveCart)
    }catch(err){
        res.status(500).json(err)
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req:any, res:any)=>{
    try{
        const updatOrder = await OrderSchema.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            { new:true }
        );
        res.status(200).json(updatOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req:any,res:any)=>{
    try{
        await OrderSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Compra deletado...");
    } catch(err){
        res.status(500).json(err);
    }
});

//GET USER ORDER
router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const orders = await OrderSchema.find({userId: req.params.userId});
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET ALL 
router.get("/", verifyTokenAndAdmin,async (req,res)=>{
    try{
        const oders = await OrderSchema.find()
        res.status(200).json(oders)
    }catch(err){
        res.status(500).json(err)
    }
});

router.get("/income", verifyTokenAndAdmin, async (req,res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));
    try{ 
        const income = await OrderSchema.aggregate([
            { $macth: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales:"$amount",
                },
            },  
            {
                $group:{
                    _id: "$month",
                    total:{$sum: "$sales"},
                }
            } 
        ]);
        res.status(200).json(income);
    } catch(err){
        res.status(500).json(err);
    }
});
export {router as orderRoute}