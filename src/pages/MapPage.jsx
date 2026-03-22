import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SafetyToggle from "../Components/SafetyToggle";
import AlertBanner from "../Components/AlertBanner";

export default function MapPage() {
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [safetyMode, setSafetyMode] = useState(false);
  const [alert, setAlert] = useState(false);

  const safetyZone = {
    center: { lat: 37.7749, lng: -122.4194 },
    radius: 200,
  };

  function getDistance(p1, p2) {
    const R = 6371000;
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLng = (p2.lng - p1.lng) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(p1.lat * Math.PI / 180) *
        Math.cos(p2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLocation((prev) => ({
        lat: prev.lat + 0.0003,
        lng: prev.lng + 0.0003,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!safetyMode) return;

    const distance = getDistance(location, safetyZone.center);

    if (distance > safetyZone.radius) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    }
  }, [location, safetyMode]);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div className="relative w-screen h-screen">
        <AlertBanner show={alert} />

        <SafetyToggle
          safetyMode={safetyMode}
          setSafetyMode={setSafetyMode}
          navigate={navigate}
        />

        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={location}
          zoom={15}
        >
          <Marker position={location} />

          {safetyMode && (
            <Circle
              center={safetyZone.center}
              radius={safetyZone.radius}
              options={{
                fillColor: "#4A90E2",
                fillOpacity: 0.2,
                strokeColor: "#1F3A5F",
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}