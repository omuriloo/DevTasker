import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/UserRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => console.log("Server is running on port 3000"));
});