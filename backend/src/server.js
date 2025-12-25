import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5001;



const startServer = async()=>{
    try {
        await connectDB()
        app.listen(port,()=>{
            console.log(`server connected:http://localhost:${port}`);
            
            
        })
        
    } catch (error) {
         console.error("Server failed to start", error);
    process.exit(1);
    }
}
startServer();