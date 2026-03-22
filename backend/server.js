import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import talkRoute from "./routes/talk.js";
import voiceRoute from "./routes/voice.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/talk", talkRoute);
app.use("/api/voice", voiceRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});