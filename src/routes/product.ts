import { Router } from "express";
import {ProductSchema} from "../models/Product";
import { verifyTokenAndAdmin } from "./verifyToken";
const router = Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req:any, res:any)=>{
    const newProduct = new ProductSchema(req.body)

    try{
        const saveProuct = await newProduct.save();
        res.status(200).json(saveProuct)
    }catch(err){
        res.status(500).json(err)
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req:any, res:any)=>{
    try{
        const updatProduct = await ProductSchema.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            { new:true }
        );
        res.status(200).json(updatProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req:any,res:any)=>{
    try{
        await ProductSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Produto deletado...");
    } catch(err){
        res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:id", async(req,res)=>{
    try{
        const product = await ProductSchema.findById(req.params.id);
        res.status(200).json(product);
    } catch(err){
        res.status(500).json(err);
    }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products; 
        if(qNew){
            products = await ProductSchema.find().sort({createdAt: -1}).limit(1)
        } else if(qCategory){
            products = await ProductSchema.find({categories:{
                $in:[qCategory],
            },
        });
        } else{
            products = await ProductSchema.find();
        }
        res.status(200).json(products);
    } catch(err){
        res.status(500).json(err);
    }
});

export {router as productRoute}
