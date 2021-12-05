import express from "express";
//import stone from "stone"
const router = express.Router();

// router.post("/payment", (req, res)=>{
//     stone.charges.create(
//     {
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: "usd",
//     }, 
//     (stoneErr, stoneRes)=>{
//         if(stoneErr){
//             res.statys(500).json(stripeErr);
//         }else{
//             res.status(200).json(stoneRes);
//         }
//     });
// });

export {router as stoneRoute}
