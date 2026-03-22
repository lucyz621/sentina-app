import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SafetySettings() {
  const [radius, setRadius] = useState(200);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5FAFF]">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-[400px] text-center">
        <h1 className="text-2xl font-semibold text-[#1F3A5F] mb-6">
          Safety Settings
        </h1>

        <input
          type="range"
          min="100"
          max="1000"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="w-full mb-4"
        />

        <p className="mb-6 text-gray-600">
          Radius: {radius} meters
        </p>

        <button
          onClick={() => navigate("/map")}
          className="w-full py-3 bg-[#1F3A5F] text-white rounded-xl mb-3"
        >
          Save
        </button>

        <button
          onClick={() => navigate("/map")}
          className="w-full py-3 border rounded-xl"
        >
          Skip
        </button>
      </div>
    </div>
  );
}