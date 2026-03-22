import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  // ✅ 初始欢迎语
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi, I'm here with you. Everything is okay. You can talk to me anytime.",
    },
  ]);

  const [recording, setRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      chunksRef.current = [];

      sendAudio(blob);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const sendAudio = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob);

    setIsLoading(true);

    const res = await fetch("http://localhost:5000/api/talk", {
      method: "POST",
      headers: {
        "voice-id": localStorage.getItem("voice_id"),
      },
      body: formData,
    });


    const data = await res.json();

    

    setIsLoading(false);

    
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: data.userText },
    ]);

    // AI播放
    if (data.audio) {
      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      audio.play();
    }

    // AI回复
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: data.reply },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* 聊天区 */}
      <div className="flex-1 p-6 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs p-3 rounded-xl ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Loading */}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
          </div>
        )}
      </div>

      {/* 按钮 */}
      <div className="p-4 flex justify-center">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className={`w-60 h-16 rounded-full text-white ${
            recording ? "bg-red-500 animate-pulse" : "bg-blue-500"
          }`}
        >
          {recording ? "Recording..." : "Hold to Talk"}
        </button>
      </div>
    </div>
  );
}