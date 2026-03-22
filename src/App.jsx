import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import SafetySettings from "./pages/SafetySettings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default entry */}
        <Route path="/" element={<Landing />} />

        {/* Redirect unknown paths back to Landing */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/safety-settings" element={<SafetySettings />} />
      </Routes>
    </Router>
  );
}

export default App;
