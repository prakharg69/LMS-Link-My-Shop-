import express from "express"
import { signUpByGoogle } from "../controllers/auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/auth/signup",signUpByGoogle)

export default AuthRouter;