import generalRoutes from "./Routes/generalRoutes.js";
import clubRoutes from "./Routes/clubRoutes.js";
import verifyEmail from "./Routes/EmailVerificationRoute.js";
import adminRoutes from "./Routes/adminRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 4000;
const url = process.env.DB_URL;

mongoose.connect(url).then(console.log("database connected successfully"));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", generalRoutes);
app.use("/api/v1/clubs", clubRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/", verifyEmail);

app.listen(port, () => {
  console.log(`app currently listening on port number ${port}... `);
});
app.use(cookieParser());app.use(cookieParser());

