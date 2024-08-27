import express, { Application, Request, Response, NextFunction } from "express";
import authRoute from "./api/routers/authRoute";
import userRoutes from "./api/routers/userRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
