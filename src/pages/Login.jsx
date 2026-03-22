import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const timerRef = useRef(null);

  const showError = (msg) => {
    setError(msg || "");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setError(""), 5000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleLogin = async () => {
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      showError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
      navigate("/skin-type");
    } catch (err) {
      showError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        src="/bg.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      

      
      

      {/* Card */}
      <div className="relative z-10 w-[380px] bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-[#1F3A5F] text-center mb-8">
          Welcome Back
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Email Input */}
        <div className="mb-4 relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#1F3A5F] text-white font-medium shadow-[0_10px_30px_rgba(31,58,95,0.25)] hover:bg-[#162B45] hover:scale-[1.02] transition-all duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#1F3A5F] font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}