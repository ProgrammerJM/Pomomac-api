import express, { Application, Request, Response, NextFunction } from "express";
// import userRoutes from "./api/routers/userRoutes";
import authRoute from "./api/routers/authRoute";
import users from "./api/routers/userRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// app.use("/api", userRoutes);
app.use("/api", authRoute);
app.use("/users", users);

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
