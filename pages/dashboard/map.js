import { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiNavigation,
  FiPackage,
  FiClock,
  FiMapPin,
  FiInfo,
} from "react-icons/fi";
// import { FaTruck, FaMapMarkerAlt, FaBullseye, FaClock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

const generatePathCoordinates = () => {
  const time = Date.now() / 1000;
  const baseRadius = 1.5;
  const lat =
    40.7128 +
    (baseRadius * Math.sin(time * 0.2) +
      baseRadius * 0.5 * Math.sin(time * 0.1));
  const lng =
    -74.006 +
    (baseRadius * 2 * Math.cos(time * 0.15) +
      baseRadius * Math.cos(time * 0.05));
  return { lat, lng };
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "text-green-600";
    case "On Route":
      return "text-yellow-600";
    default:
      return "text-red-600";
  }
};

const calculateDistance = (coord1, coord2) => {
  const R = 6371;
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLon = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getDirectionFromOrigin = (origin, current) => {
  const directions = [];
  if (current.lat > origin.lat + 0.1) directions.push("North");
  else if (current.lat < origin.lat - 0.1) directions.push("South");
  if (current.lng > origin.lng + 0.1) directions.push("East");
  else if (current.lng < origin.lng - 0.1) directions.push("West");
  return directions.join("-") || "Center";
};

export default function TrackingMap() {
  const router = useRouter();
  const {
    id = "Unknown",
    name = "John Doe",
    status = "Unavailable",
    bio = "No details available",
  } = router.query;

  const initialPosition = { lat: 40.7128, lng: -74.006 };
  const [driverLocation, setDriverLocation] = useState(initialPosition);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [deliveries, setDeliveries] = useState(status === "On Route" ? 3 : 0);
  const [loading, setLoading] = useState(true);
  const [pathHistory, setPathHistory] = useState([]);
  const [maxDistance, setMaxDistance] = useState(0);

  const calculateMapPosition = (coord) => {
    const scale = 20;
    return {
      left: `calc(50% + ${(coord.lng - initialPosition.lng) * scale}px)`,
      top: `calc(50% + ${(coord.lat - initialPosition.lat) * scale}px)`,
    };
  };

  useEffect(() => {
    if (router.isReady) {
      setLoading(false);
      const initialDriverLocation = generatePathCoordinates();
      setDriverLocation(initialDriverLocation);
      setPathHistory([initialDriverLocation]);
    }

    const interval = setInterval(() => {
      const newLocation = generatePathCoordinates();
      const distance = calculateDistance(initialPosition, newLocation);
      setMaxDistance((prev) => Math.max(prev, distance));
      setDriverLocation(newLocation);
      setPathHistory((prev) => [...prev.slice(-50), newLocation]);
      setLastUpdated(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [router.isReady]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const mapPosition = calculateMapPosition(driverLocation);
  const distanceFromOrigin = calculateDistance(initialPosition, driverLocation);
  const direction = getDirectionFromOrigin(initialPosition, driverLocation);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* <Link href={`/drivers/${id}`}> */}
                <Link href={"/dashboard"}>
                  <button
                    aria-label="Back to Profile"
                    className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg text-gray-600"
                  >
                    <FiArrowLeft size={20} />
                    <span>Back to Profile</span>
                  </button>
                </Link>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
                      {name?.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{name}</h2>
                      <p className={`text-sm ${getStatusColor(status)}`}>
                        {status} • Driver #{id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block text-sm text-gray-500">
                <FiInfo className="inline mr-1" />
                {bio}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-96 bg-gray-200 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-50">
                {/* Grid Background */}
                <div className="grid grid-cols-8 grid-rows-8 h-full">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className="border border-blue-100" />
                  ))}
                </div>

                {/* Origin point marker */}
                <div
                  className="absolute w-4 h-4 rounded-full bg-red-500"
                  style={{
                    left: "calc(50% - 8px)",
                    top: "calc(50% - 8px)",
                  }}
                >
                  <div className="absolute -inset-4 border-2 border-red-200 rounded-full" />
                </div>

                {/* Path trail with gradient */}
                {pathHistory.map((pos, index) => {
                  const position = calculateMapPosition(pos);
                  return (
                    <div
                      key={index}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        ...position,
                        transform: "translate(-50%, -50%)",
                        background: `rgba(59, 130, 246, ${
                          (index / pathHistory.length) * 0.7
                        })`,
                        boxShadow:
                          index === pathHistory.length - 1
                            ? "0 0 10px rgba(59, 130, 246, 0.5)"
                            : "none",
                      }}
                    />
                  );
                })}

                {/* Driver marker */}
                <div
                  className="absolute transition-all duration-1000 ease-in-out"
                  style={{
                    ...mapPosition,
                    transform: `translate(-50%, -50%) rotate(${
                      Math.atan2(
                        driverLocation.lat -
                          (pathHistory[pathHistory.length - 2]?.lat ||
                            driverLocation.lat),
                        driverLocation.lng -
                          (pathHistory[pathHistory.length - 2]?.lng ||
                            driverLocation.lng)
                      ) *
                      (180 / Math.PI)
                    }deg)`,
                  }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <FiNavigation className="text-white" size={20} />
                    </div>
                    <div className="animate-ping absolute inset-0 bg-blue-400 rounded-full opacity-75" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiMapPin />
                  <span>Current Location</span>
                </div>
                <p className="mt-2 font-mono">
                  {driverLocation.lat.toFixed(4)}°N,{" "}
                  {driverLocation.lng.toFixed(4)}°W
                </p>
                <p className="mt-1 text-sm text-blue-600 font-medium">
                  {direction} • {distanceFromOrigin.toFixed(1)} km from origin
                </p>
                <p className="text-xs text-gray-500">
                  Max Distance: {maxDistance.toFixed(1)} km
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiClock />
                  <span>Last Updated</span>
                </div>
                <p className="mt-2">{formatTime(lastUpdated)}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiPackage />
                  <span>Deliveries Today</span>
                </div>
                <p className="mt-2">{deliveries} packages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
