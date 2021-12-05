
import {UserSchema} from "../models/User";
import CryptoJS from 'crypto-js';
import {Router} from "express"
import { verifyTokenAndAdmin,verifyTokenAndAuthorization } from "./verifyToken";
const router = Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req:any, res:any)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updateUser = await UserSchema.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            { new:true }
        );
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req:any,res:any)=>{
    try{
        await UserSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Usuário deletado...");
    } catch(err){
        res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await UserSchema.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others});
    } catch(err){
        res.status(500).json(err);
    }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    const query = req.query.new;
    try{
        const users = query 
        ? await UserSchema.find().sort({ _id: -1 }).limit(5) 
        : await UserSchema.find();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET USER STAT
router.get("/stats", verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
    try{ 
        const data = await UserSchema.aggregate([
            { $macth: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: {$month: "$createdAt"},
                },
            },  
            {
                $group:{
                    _id: "$month",
                    total:{$sum: 1},
                }
            } 

        ]);
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
});

export {router as userRoute}
