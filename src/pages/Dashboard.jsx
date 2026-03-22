import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Feature Bar ---
const FeatureBar = ({
  title,
  description,
  onClick,
  linkText,
  onLinkClick,
  clickable = true,
}) => (
  <div
    onClick={clickable ? onClick : undefined}
    className={`w-full max-w-2xl bg-gradient-to-r from-[#E3F2FD] to-[#F1F8FE] hover:from-[#D1E9FF] hover:to-[#E3F2FD] transition-all rounded-2xl p-8 mb-6 shadow-sm border border-white/50 group ${
      clickable ? "cursor-pointer" : "cursor-default"
    }`}
  >
    <div className="flex justify-between items-start">
      <div className="w-full">
        <h3 className="text-2xl font-bold text-[#1F3A5F] group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 mt-1">{description}</p>

        {linkText && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLinkClick?.();
            }}
            className="mt-3 text-sm text-blue-500 hover:text-blue-600 hover:underline font-medium"
          >
            {linkText}
          </button>
        )}
      </div>

      {clickable && (
        <span className="text-2xl text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity ml-4 pt-1">
          →
        </span>
      )}
    </div>
  </div>
);

const inputStyle =
  "w-full bg-[#1A263C] text-white rounded-full px-6 py-4 text-center placeholder:text-gray-400 outline-none mb-4 shadow-inner";

export default function Dashboard() {
  const [view, setView] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const patientName = localStorage.getItem("patientName") || "User";

  const navigate = useNavigate();

  // --- Dashboard Page ---
  if (view === "dashboard") {
    return (
      <div className="relative min-h-screen bg-[#FDFBF7] font-sans overflow-hidden flex flex-col items-center">
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25] bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('/logo.png')`,
            backgroundSize: "100vh",
          }}
        />

        {/* Profile Button */}
        <div className="absolute top-8 left-8 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-16 h-16 rounded-full bg-blue-300 text-white text-2xl font-bold flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            {patientName[0]}
          </button>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="absolute inset-0 z-[100] flex">
            <div className="w-80 h-full bg-white shadow-2xl p-8 flex flex-col pt-32 animate-in slide-in-from-left duration-300">
              <button
                onClick={() => {
                  setView("update");
                  setSidebarOpen(false);
                }}
                className="text-left py-4 px-6 rounded-xl hover:bg-blue-50 text-xl font-medium text-gray-700 flex items-center gap-3"
              >
                👤 Update Profile
              </button>

              <button
                onClick={() => setSidebarOpen(false)}
                className="mt-auto text-gray-400 hover:text-gray-600 py-4"
              >
                Close Menu
              </button>
            </div>

            <div
              className="flex-1 bg-black/20"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 pt-32 px-6 w-full flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1F3A5F] mb-16 text-center tracking-tight">
            Hi, I&apos;m here with you.
          </h1>

          <div className="w-full flex flex-col items-center">
            <FeatureBar
              title="Location Tracking"
              description="Keep an eye on safety, anytime, anywhere."
              onClick={() => {
                console.log("clicked");
                navigate("/map");
              }}
            />

            <FeatureBar
              title="Talk with Me"
              description="Connect with the voice that brings comfort."
              clickable={false}
              linkText="Record familiar voice"
              onLinkClick={() => navigate("/talk")}
            />

            <FeatureBar
              title="Statistics"
              description="View daily activities and interaction insights."
              onClick={() => alert("Coming soon")}
            />
          </div>
        </div>
      </div>
    );
  }

  // --- Update Profile ---
  if (view === "update") {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
        style={{ backgroundImage: `url('/waves.png')` }}
      >
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[40px] w-full max-w-2xl border border-white/20 shadow-2xl relative">
          {/* Back */}
          <button
            onClick={() => setView("dashboard")}
            className="absolute top-8 left-8 text-white/70 hover:text-white"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-extrabold text-white text-center mb-10 uppercase tracking-widest">
            Update
          </h1>

          <div className="space-y-2">
            <h2 className="text-white/60 text-center text-sm mb-4 uppercase tracking-widest">
              Patient Details
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                className={inputStyle}
                defaultValue={patientName}
              />
              <input
                type="number"
                placeholder="Age"
                className={inputStyle}
                defaultValue="72"
              />
              <input
                type="text"
                placeholder="Pronouns"
                className={inputStyle}
                defaultValue="She/Her"
              />
            </div>

            <input
              type="text"
              placeholder="Stage of Disease"
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Address"
              className={inputStyle}
            />
            <input
              type="text"
              placeholder="Emergency Contact"
              className={inputStyle}
            />

            <div className="pt-8 flex justify-center">
              <button
                onClick={() => setView("dashboard")}
                className="px-12 py-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold text-lg hover:shadow-lg transition active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}