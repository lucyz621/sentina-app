export default function SafetyToggle({ safetyMode, setSafetyMode, navigate }) {
  return (
    <button
      onClick={() => {
        if (!safetyMode) {
          localStorage.setItem("safetyMode", "true");
          setSafetyMode(true);
          navigate("/safety-settings");
        } else {
          localStorage.setItem("safetyMode", "false");
          setSafetyMode(false);
        }
      }}
      className="absolute top-6 left-6 bg-white px-4 py-2 rounded-xl shadow z-50"
    >
      {safetyMode ? "Safety ON" : "Safety OFF"}
    </button>
  );
}