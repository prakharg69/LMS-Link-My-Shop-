import express from "express"
import { loginByGoogle, signUpByGoogle } from "../controllers/auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/auth/signup",signUpByGoogle)
AuthRouter.post("/auth/login",loginByGoogle)

export default AuthRouter;