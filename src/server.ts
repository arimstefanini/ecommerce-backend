import express from "express";
import mongoose  from "mongoose";
import "dotenv/config";
import {userRoute} from "./routes/user";
import {authRoute} from "./routes/auth";
const app = express();



mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("DBConnection Successfull!"))
 .catch((err:string)=>{
   console.log(err)
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 3000, () =>{
  console.log("Backend server is running!")
})