import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth.route.js";
import UserRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import storeRoute from "./routes/store.route.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Test route
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "hello" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes
app.use("/api", AuthRouter);
app.use("/api",UserRouter);
app.use("/api",storeRoute);

export default app;
