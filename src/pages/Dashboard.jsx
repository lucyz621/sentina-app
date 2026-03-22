import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SafetyToggle from "../Components/SafetyToggle";
import AlertBanner from "../Components/AlertBanner";

export default function MapPage() {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAZR_lu5iUm6LSGSHXkrh2__ci1oEpfktk", // ⚠️ 必须换成你的
  });

  const [radius, setRadius] = useState(200);
  const [safetyMode, setSafetyMode] = useState(false);

  
  const [location, setLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  
  const [mapCenter] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  
  const [safetyCenter, setSafetyCenter] = useState(null);

  const [alert, setAlert] = useState(false);

  
  useEffect(() => {
    const savedMode = localStorage.getItem("safetyMode");
    setSafetyMode(savedMode === "true");
  }, []);

 
  useEffect(() => {
    const savedRadius = localStorage.getItem("radius");
    if (savedRadius) setRadius(Number(savedRadius));
  }, []);


  useEffect(() => {
    if (safetyMode && !safetyCenter) {
      setSafetyCenter(location);
    }
  }, [safetyMode, location, safetyCenter]);


  useEffect(() => {
    const interval = setInterval(() => {
      setLocation((prev) => ({
        lat: prev.lat + 0.0003,
        lng: prev.lng + 0.0003,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);


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
    if (!safetyMode || !safetyCenter) return;

    const distance = getDistance(location, safetyCenter);

    if (distance > radius) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    }
  }, [location, safetyMode, radius, safetyCenter]);

  if (!isLoaded) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen">
      
      
      <AlertBanner show={alert && safetyMode} />

     
      <SafetyToggle
        safetyMode={safetyMode}
        setSafetyMode={setSafetyMode}
        navigate={navigate}
      />

      
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}  
        zoom={15}
      >
        
        <Marker position={location} />

       
        {safetyMode && safetyCenter && (
          <Circle
            center={safetyCenter}
            radius={radius}
            options={{
              fillColor: "#4A90E2",
              fillOpacity: 0.4,
              strokeColor: "#1F3A5F",
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}