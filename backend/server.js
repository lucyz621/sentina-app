import express from "express";

const app = express();
app.use(express.json());

// demo route (not used)
app.post("/api/gemini", (req, res) => {
  res.json({
    reply: "This is a simulated backend response.",
  });
});

app.listen(5000, () => {
  console.log("Backend ready (demo mode)");
});