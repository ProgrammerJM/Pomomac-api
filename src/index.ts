import express, { Application, Request, Response, NextFunction } from "express";
import userRoutes from "./api/routers/userRoutes";

const app: Application = express();
app.use(express.json());

app.use("/api", userRoutes);

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
