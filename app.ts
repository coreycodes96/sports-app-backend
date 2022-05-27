import express from "express";
import env from "dotenv";
env.config();
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.argv[3];

export default app;