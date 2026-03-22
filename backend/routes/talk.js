import express from "express";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    console.log("API HIT");

    const filePath = req.file.path;
    const VOICE_ID = req.headers["voice-id"];

    console.log("VOICE_ID:", VOICE_ID);

    // 🧠 STT
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    formData.append("model", "whisper-1");

    const sttRes = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer AIzaSyBOEGRHrwd4E8nLscHc_cZXYcyKXUm4t9o`,
          ...formData.getHeaders(),
        },
      }
    );

    const userText = sttRes.data.text;
    console.log("STT:", userText);

    // 🤖 Gemini
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a warm, familiar voice comforting a dementia patient. Speak simply.\nUser: ${userText}`,
              },
            ],
          },
        ],
      }
    );

    const reply =
      geminiRes.data.candidates[0].content.parts[0].text;

    console.log("Reply:", reply);
    

    // 🔊 ElevenLabs
    const ttsRes = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text: reply,
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVEN_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const audioBase64 = Buffer.from(ttsRes.data).toString("base64");

    res.json({
      userText,
      reply,
      audio: audioBase64,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error in AI pipeline" });
  }
});

export default router;