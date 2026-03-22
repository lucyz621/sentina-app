import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#F5FAFF] to-[#EAF4FF]">
      
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">
        
        <h2 className="text-2xl font-semibold text-[#1F3A5F] mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button className="w-full py-3 rounded-xl bg-[#1F3A5F] text-white font-medium hover:bg-[#162B45] transition">
          Register
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}