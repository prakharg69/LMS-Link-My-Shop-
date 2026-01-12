import express from "express"
import { Protected } from "../middlewares/auth.middleware.js";
import { createDigitalPage } from "../controllers/digitalPage.controller.js";

const DigitalPageRouter = express.Router();
DigitalPageRouter.post("/create-digital",Protected,createDigitalPage);

export default DigitalPageRouter;