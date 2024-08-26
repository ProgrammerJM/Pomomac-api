import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
