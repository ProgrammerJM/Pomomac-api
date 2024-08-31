import express, { Application } from "express";
import authRoute from "./api/routers/authRoute";
import userRoutes from "./api/routers/userRoutes";
import taskService from "./api/routers/taskRoutes";
import sessionService from "./api/routers/sessionRoutes";
import intervalService from "./api/routers/intervalRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);
app.use("/api/task", taskService);
app.use("/api/session", sessionService);
app.use("/api/interval", intervalService);

app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
