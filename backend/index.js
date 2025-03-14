import express, { json } from "express";
import { configDotenv } from "dotenv";
import { checkAnswer, fetchLyrics } from "./utilities/functionalities.js";
import cors from "cors";
const app = express();
app.use(cors());
configDotenv();
app.use(json());
const port = process.env.PORT || 3000;
app.get("/api/fetchLyrics",fetchLyrics);
app.post("/api/check-answer",checkAnswer);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
