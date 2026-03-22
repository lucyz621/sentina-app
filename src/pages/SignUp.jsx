import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputStyle =
  "w-full bg-white/80 text-[#1F3A5F] rounded-xl px-5 py-3 text-sm text-left placeholder:text-gray-400 focus:ring-2 focus:ring-blue-200 backdrop-blur transition";

export default function SignUp() {
  const [stage, setStage] = useState("");
  const navigate = useNavigate(); 
  const [name, setName] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <img
        src="/bg.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      <div className="absolute inset-0 bg-[#1F3A5F]/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F3A5F]/30 via-[#1F3A5F]/10 to-transparent"></div>

      {/* Card */}
      <div className="relative z-10 w-[500px] bg-white/85 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] p-8">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-[#1F3A5F] text-center mb-6">
          Create Account
        </h1>

        {/* Form */}
        <form className="space-y-4">

          {/* Account */}
          <input
            placeholder="Name"
            className={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="password" placeholder="Password" className={inputStyle} />

          {/* Section */}
          <p className="text-xs text-gray-400 uppercase tracking-wider text-center mt-4">
            About the Patient
          </p>

          {/* Row */}
          <div className="flex gap-2">
            <input placeholder="Name" className={inputStyle} />
            <input type="number" placeholder="Age" className={inputStyle} />
          </div>

          <input placeholder="Pronouns" className={inputStyle} />

          {/* Select */}
          <div className="relative">
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className={`${inputStyle} appearance-none ${
                stage === "" ? "text-gray-400" : "text-[#1F3A5F]"
              }`}
            >
              <option value="" disabled>
                Stage of Disease
              </option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              
            </div>
          </div>

          <input placeholder="Address" className={inputStyle} />
          <input placeholder="Emergency Contact" className={inputStyle} />

          {/* Button */}
          <button
            type="button"
            onClick={() => {
                localStorage.setItem("patientName", name);
                navigate("/dashboard")
            }}
            className="w-full py-3 rounded-xl bg-[#1F3A5F] text-white font-medium shadow-[0_10px_30px_rgba(31,58,95,0.25)] hover:bg-[#162B45] hover:scale-[1.02] transition-all duration-300"
          >
            Create Profile
          </button>

          {/* Redirect to Login */}
          <p className="text-xs text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#1F3A5F] cursor-pointer font-medium hover:underline"
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}