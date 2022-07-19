import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import * as dotenv from "dotenv";
const app = express();
dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
console.log(FRONTEND_URL);
app.use(cors({
  origin:[FRONTEND_URL],
  credentials:false,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => app.listen(process.env.PORT))
  .then(() =>
    console.log("Connected TO Database and Listening TO Localhost 5000")
  )
  .catch((err) => console.log(err));
