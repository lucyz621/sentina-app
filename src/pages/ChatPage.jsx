import { useState, useRef } from "react";

export default function ChatPage() {
  // ✅ dynamic name
  const rawName = localStorage.getItem("patientName") || "Friend";
  const patientName =
    rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `${patientName}, I'm here with you. Everything is okay.`,
    },
  ]);

  const [recording, setRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const mediaRecorderRef = useRef(null);

  const conversations = [
    {
      input: "Where am I?",
      replies: [
        "You're at home. You're safe.",
        "You're in a familiar place. Everything is okay.",
      ],
    },
    {
      input: "What time is it?",
      replies: [
        "It's evening now. It's time to rest.",
        "It's morning. Let's take it slowly.",
      ],
    },
    {
      input: "I feel scared",
      replies: [
        "It's okay to feel scared. I'm here with you.",
        "You're safe. Nothing is wrong.",
      ],
    },
    {
      input: "I feel confused",
      replies: [
        "It's okay. I'm here to help you.",
        "Everything is alright. No need to worry.",
      ],
    },
    {
      input: "Where is my family?",
      replies: [
        "Your family loves you very much.",
        "You're not alone. They care about you.",
      ],
    },
  ];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.onstop = () => handleAI();

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleAI = () => {
    const convo =
      conversations[Math.floor(Math.random() * conversations.length)];

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: convo.input },
    ]);

    setIsThinking(true);

    setTimeout(() => {
      const replyText =
        convo.replies[Math.floor(Math.random() * convo.replies.length)];

      const reply = `${patientName}, ${replyText}`;

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply },
      ]);

      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.rate = 0.85;
      speechSynthesis.speak(utterance);

      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-[#FDFBF7]">
      <div className="space-y-3 max-w-md mx-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isThinking && <p>...</p>}
      </div>

      <div className="flex flex-col items-center">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className={`w-24 h-24 rounded-full text-white ${
            recording ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          🎤
        </button>
      </div>
    </div>
  );
}