import { useState, useRef } from "react";

export default function ChatPage() {
  
  const patientName = "Leon";

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `${patientName}, I'm here with you. Everything is okay. You are safe.`,
    },
  ]);

  const [recording, setRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const mediaRecorderRef = useRef(null);

  // 🧠 Context-based conversations
  const conversations = [
    {
      input: "Where am I?",
      replies: [
        "You're at home. You're safe.",
        "You're in a familiar place. Everything is okay.",
        "You're right here, safe and comfortable.",
      ],
    },
    {
      input: "What time is it?",
      replies: [
        "It's evening now. It's time to rest.",
        "It's morning. Let's start the day slowly.",
        "You don't need to worry about time. Just relax.",
      ],
    },
    {
      input: "I feel scared",
      replies: [
        "It's okay to feel scared. I'm here with you.",
        "You're safe. Nothing is wrong.",
        "Take a deep breath. Everything is okay.",
      ],
    },
    {
      input: "I feel confused",
      replies: [
        "It's okay, confusion happens. I'm here to help you.",
        "You're safe. We can take things slowly.",
        "Everything is alright. No need to worry.",
      ],
    },
    {
      input: "Where is my family?",
      replies: [
        "Your family loves you very much.",
        "They care about you and will be with you soon.",
        "You're not alone. Your family is always with you in heart.",
      ],
    },
    {
      input: "What should I do?",
      replies: [
        "Let's take things slowly and rest a bit.",
        "You can sit down and relax.",
        "You're doing just fine. No need to rush.",
      ],
    },
  ];

  // 🎤 Start recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.onstop = () => {
      handleAI();
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // 🧠 Smart AI (context-matched)
  const handleAI = () => {
    const convo =
      conversations[Math.floor(Math.random() * conversations.length)];

    const userText = convo.input;

    // show user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
    ]);

    setIsThinking(true);

    setTimeout(() => {
      const selectedReply =
        convo.replies[Math.floor(Math.random() * convo.replies.length)];

      // 💥 Add patient name
      const reply = `${patientName}, ${selectedReply}`;

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply },
      ]);

      // 🔊 Voice output
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.rate = 0.85;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);

      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-between p-6">
      
      {/* 💬 Messages */}
      <div className="w-full max-w-md space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* 🤖 Thinking animation */}
        {isThinking && (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
          </div>
        )}
      </div>

      {/* 🎤 Siri-style button */}
      <div className="flex flex-col items-center mb-10">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl ${
            recording ? "bg-red-500 animate-pulse scale-110" : "bg-blue-500"
          }`}
        >
          🎤
        </div>

        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-full"
        >
          {recording ? "Listening..." : "Hold to Talk"}
        </button>
      </div>
    </div>
  );
}