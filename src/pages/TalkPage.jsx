import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function TalkPage() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  
  const sampleSentences = [
    "It's time to go to sleep.",
    "It's a beautiful day outside, maybe go for a walk.",
    "Don't forget to take your medicine.",
    "I'm here with you, everything is okay.",
  ];

  const uploadVoice = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob);

    const res = await fetch("http://localhost:5000/api/voice", {
      method: "POST",
      body: formData,
    });

    

    const data = await res.json();

    localStorage.setItem("voice_id", data.voice_id);
    setSaved(true);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setAudioURL(url);
      chunksRef.current = [];

      await uploadVoice(blob);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7] px-6">
      <h1 className="text-3xl mb-6 text-[#1F3A5F]">
        Record Familiar Voice
      </h1>

      {/* 示例句子 */}
      <div className="mb-6 text-center text-[#1F3A5F] space-y-2">
        {sampleSentences.map((s, i) => (
          <p key={i}>"{s}"</p>
        ))}
      </div>

      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className={`w-64 h-20 rounded-full text-white ${
          recording ? "bg-red-500 animate-pulse" : "bg-blue-500"
        }`}
      >
        {recording ? "Recording..." : "Hold to Record"}
      </button>

      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL}></audio>
        </div>
      )}

      {saved && (
        <button
          onClick={() => navigate("/chat")}
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded"
        >
          Continue to Talk With Me →
        </button>
      )}
    </div>
  );
}