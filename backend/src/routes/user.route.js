import express from "express"
import { Protected } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const UserRouter = express.Router()
UserRouter.get('/user-data',Protected,getUser)

export default UserRouter;