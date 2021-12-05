import express from "express";
import mongoose  from "mongoose";
import "dotenv/config";
import {userRoute} from "./routes/user";
import {authRoute} from "./routes/auth";
import {productRoute} from "./routes/product";
import {cartRoute} from "./routes/cart";
import {orderRoute} from "./routes/order";
const app = express();



mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("DBConnection Successfull!"))
 .catch((err:string)=>{
   console.log(err)
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);


app.listen(process.env.PORT || 3000, () =>{
  console.log("Backend server is running!")
})