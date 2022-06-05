import express from "express";
import env from "dotenv";
env.config();
import cors from "cors";
import accountRoutes from "./src/routes/account/account.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//Routes
app.use("/api/account", accountRoutes);

const PORT = process.argv[3];

export default app;