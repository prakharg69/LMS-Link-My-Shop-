import express from "express"
import { Protected } from "../middlewares/auth.middleware.js";
import { getMyShopById, getMyStore, storeCreated, UpdateStore, verifyStoreEmail, verifyStoreOtp } from "../controllers/store.controller.js";

const storeRoute = express.Router();

storeRoute.post("/create-store",Protected,storeCreated);
storeRoute.get("/getMyShop",Protected,getMyStore);
storeRoute.get("/getMyShopById",Protected,getMyShopById)
storeRoute.post("/verifyStoreEmail",Protected,verifyStoreEmail);
storeRoute.post("/verify-store-otp",Protected,verifyStoreOtp);
storeRoute.put("/update-store/:id",Protected,UpdateStore)
export default storeRoute;