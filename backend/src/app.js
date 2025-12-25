import express from "express"
import dotenv from "dotenv"
const app = express();
dotenv.config();

app.get("/",(req,res)=>{
    try {
        res.status(200).json({messgae:"hello"});
    } catch (error) {
        res.status(500).json({messgae:error});
    }
})

export default app;