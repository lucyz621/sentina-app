import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const filePath = req.file.path;

    console.log("Uploading file:", filePath);

    const formData = new FormData();
    formData.append("name", "patient_voice");

    // 🔴 关键：改这里（非常重要）
    formData.append("files[]", fs.createReadStream(filePath));

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/voices/add",
      formData,
      {
        headers: {
          "xi-api-key": process.env.ELEVEN_API_KEY,
          ...formData.getHeaders(),
        },
      }
    );

    console.log("ElevenLabs response:", response.data);

    const voice_id = response.data.voice_id;

    res.json({ voice_id });
  } catch (err) {
    console.error(
      "VOICE ERROR:",
      err.response?.data || err.message
    );

    res.status(500).json({
      error: err.response?.data || "Voice upload failed",
    });
  }
});

export default router;
