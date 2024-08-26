import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.use(express.json());

import userRoutes from "./api/routers/userRoutes";

app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
