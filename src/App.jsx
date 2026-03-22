import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import SafetySettings from "./pages/SafetySettings";
import TalkPage from "./pages/TalkPage";
import Statistics from "./pages/Statistics"; 
function App() {
  return (
    <Router>
      <Routes>
        {/* Default entry */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/safety-settings" element={<SafetySettings />} />
        <Route path="/talk" element={<TalkPage />} />
        <Route path="/statistics" element={<Statistics />} /> {/* 🔴 2. 注册路由 */}
        
        {/* Redirect unknown paths back to Landing (放到最后) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;