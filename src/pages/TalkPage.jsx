import { useState, useRef } from "react";

export default function TalkPage() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      chunksRef.current = [];
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // 停止录音
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">


      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-[#F7F3EC] to-[#EFEAE2]" />

      <div
        className="absolute bottom-0 w-full h-1/3 bg-blue-200"
        style={{
          borderTopLeftRadius: "50% 20%",
          borderTopRightRadius: "50% 20%",
        }}
      />

      <div className="relative z-10 text-center px-6">

        <h1 className="text-4xl font-bold text-[#1F3A5F] mb-6">
          Record patient's most familiar voice to keep them company
        </h1>

        <p className="text-gray-500 mb-2">Instructions</p >

        <div className="text-lg text-[#1F3A5F] mb-10 space-y-2">
          <p>"It's time to go to sleep"</p >
          <p>"Have a good day"</p >
          <p>"It's 9 o'clock in the morning"</p >
        </div>

   
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className={`w-72 h-20 rounded-full text-white text-lg font-semibold transition ${
            recording ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {recording ? "Recording..." : "Hold to Record"}
        </button>

        {audioURL && (
          <div className="mt-6">
            <audio controls src={audioURL}></audio>
          </div>
        )}
      </div>
    </div>
  );
}