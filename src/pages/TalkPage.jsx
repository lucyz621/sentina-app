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
    "Hi, I'm here with you.",
    "Everything is okay, you're safe.",
    "It's time to go to sleep.",
    "Don't forget your medicine.",
    "I'm right here, you're not alone.",
  ];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setAudioURL(url);
      chunksRef.current = [];
      setSaved(true);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7] px-6 text-center">
      <h1 className="text-3xl mb-6 text-[#1F3A5F]">
        Record Familiar Voice
      </h1>

      <div className="mb-6 space-y-2 text-[#1F3A5F]">
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

      {audioURL && <audio className="mt-4" controls src={audioURL}></audio>}

      {saved && (
        <button
          onClick={() => navigate("/chat")}
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded"
        >
          Continue →
        </button>
      )}
    </div>
  );
}