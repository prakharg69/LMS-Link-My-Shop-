import express from "express"
import { Protected } from "../middlewares/auth.middleware.js";
import { getMyStore, storeCreated } from "../controllers/store.controller.js";

const storeRoute = express.Router();

storeRoute.post("/create-store",Protected,storeCreated);
storeRoute.get("/getMyShop",Protected,getMyStore);
export default storeRoute;