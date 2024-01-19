import express from "express"
import {config} from "dotenv"
import {connectDB} from "./data/database.js"
import cors from "cors"; 
import otprout from "./routes/otp.js"
import session from "./routes/SessionLog.js"



const app=express();

config({
    path:"./config.env"
});

connectDB()
app.use(express.json());

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use("/wundrsight/v1/serialno",otprout);
app.use("/wundrsight/v1/session",session);

app.get("/",(req,res)=>{
    res.send("hello dear");
})
const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`app is running ${port} `)
});