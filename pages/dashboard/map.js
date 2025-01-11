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
import { clg, datemap, Js, ocn } from "@/js/basic";
import Loader from "@/components/Loader";
import domap from "@/js/leaflet/leaflet";
import docoder from "@/js/leaflet/leaflet-geocoder";
var map_1 = "",
  mapTiles = {
    satelite: "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    terrain: "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  },
  acuObj = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

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

function newmap(v, fnc) {
  if (!L || !L.map) return;
  clg(L);
  if (map_1) return;
  try {
    var map = L.map(v, {
        center: L.latLng(9.7866631, 8.8525467),
        zoom: 5,
        measureControl: true,
        "pointer-event": "none",
        minZoom: 1,
      }),
      eo = { map: map, markers: {}, track: true };

    L.tileLayer(mapTiles.terrain, {
      tileSize: 512,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      zoomOffset: -1,
      minZoom: 2,
      crossOrigin: true,
      detectRetina: true,
    }).addTo(map);
    L.Control.geocoder().addTo(map);

    return eo;
  } catch (err) {
    location.reload();
  }
}
export default function TrackingMap(props) {
  var on = "",
    def = { lat: 9.7869931, lng: 8.8525467 },
    router = useRouter(),
    { appLink, stat, driver, setDriver } = props,
    { auth } = router.query;

  const initialPosition = def;
  const [driverLocation, setDriverLocation] = useState(initialPosition);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [deliveries, setDeliveries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pathHistory, setPathHistory] = useState([]);
  const [maxDistance, setMaxDistance] = useState(0),
    [direction, setDirection] = useState(""),
    [mapPosition, setMapPosition] = useState(""),
    [distanceFromOrigin, setDistanceFromOrigin] = useState(
      calculateDistance(def, def)
    );

  const getStatusColor = (status) => {
    switch (status) {
      case stat[0]:
        return "text-green-600";
      case stat[1]:
        return "text-yellow-600";
      default:
        return "text-red-600";
    }
  };

  const calculateMapPosition = (coord) => {
    const scale = 20;
    return {
      left: `calc(50% + ${(coord.lng - initialPosition.lng) * scale}px)`,
      top: `calc(50% + ${(coord.lat - initialPosition.lat) * scale}px)`,
    };
  };

  function castme() {
    fetch(`${appLink}/mapAuth/track/${driver.id}/on`, {
      method: "GET",
      headers: { accessToken: auth },
    })
      .then(async (resp) => {
        var data = await resp.json();
        clg(data);
      })
      .catch((err) => {
        clg(err);
        clg(
          "There was an error sending your tracking status, please check your connection and refresh!!!"
        );
      });
  }

  function kickmap() {
    map_1 = newmap("mapper");
    geoposition(map_1);
  }
  function geoposition(mp) {
    if (!navigator.geolocation) {
      alert("device not allowing live tracking!!");
      return;
    }
    navigator.geolocation.watchPosition(
      (res) => {
        liveTrack(mp, res.coords);
      },
      errFnc,
      acuObj
    );

    function errFnc(err) {
      clg("position error");
      clg(err);
    }
  }
  function iconer(c) {
    var icon = L.divIcon({
      iconSize: [17, 17],
      iconAnchor: [10, 10],
      popupAnchor: [-10, -10],
      shadowSize: [0, 0],
      className: c,
    });
    return icon;
  }
  function liveTrack(mp, res) {
    if (!mp) return;
    var { latitude, longitude } = res,
      v1 = new L.LatLng(latitude, longitude),
      v2;
    def = v1;
    setDriverLocation(v1);
    setLastUpdated(new Date());
    const distance = calculateDistance(initialPosition, v1);
    setMaxDistance((prev) => Math.max(prev, distance));
    setPathHistory((prev) => [...prev.slice(-50), v1]);
    setMapPosition(calculateMapPosition(driverLocation));
    setDistanceFromOrigin(calculateDistance(initialPosition, driverLocation));
    setDirection(getDirectionFromOrigin(initialPosition, driverLocation));

    clg("geoposition log");
    if (mp.lock && mp.mark_1) {
      v2 = coordistance({ map: mp.map, dist_1: mp.mark_1, dist_2: v1 });
      mp.lock.innerHTML = `You are currently ${v2}Metres away from your Mark 1`;
    }
    if (!mp.markers[driver.id]) {
      def = new L.LatLng(latitude, longitude);
      var ic = iconer("animated-icon bgreen"),
        marker = L.marker([latitude, longitude], {
          icon: ic,
          title: driver.info.username,
        });
      mp.markers[driver.id] = marker;
      marker
        .addTo(mp.map)
        .bindPopup(`<h1>${driver.info.username}</h1>`)
        .openPopup();
      clg("icon");
      document.getElementsByClassName("animated-icon")[0].innerHTML =
        '<div id="driver-icon" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg" style="background:blue;width:1.7rem;height:1.7rem;border-radius:100%;align-items:center;justify-content:center;display:flex"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-white" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg></div>';
      mp.map.setView(def, 19);
    } else {
      mp.markers[driver.id].setLatLng(v1);
      if (mp.track) {
        //mp.map.setView(def, 18);
        mp.map.panTo(v1);
        clg("new marker location set");
      } else {
        clg("tracking disabled");
      }
    }
    clg("LatLng data");
    sendmylocation({
      latitude,
      longitude,
      time: datemap(),
    });
  }
  async function sendmylocation(o) {
    fetch(`${appLink}/mapAuth/location`, {
      method: "POST",
      headers: { accessToken: auth, "Content-Type": "application/json" },
      body: Js(o),
    })
      .then(async (resp) => {
        var data = await resp.json();
      })
      .catch((err) => {
        clg(err);
      });
  }

  useEffect(() => {
    var a = document.getElementById("driver-icon");
    if (!a) return;
    a.style.transform = `translate(-50%, -50%) rotate(${
      Math.atan2(
        driverLocation.lat -
          (pathHistory[pathHistory.length - 2]?.lat || driverLocation.lat),
        driverLocation.lng -
          (pathHistory[pathHistory.length - 2]?.lng || driverLocation.lng)
      ) *
      (180 / Math.PI)
    }deg)`;
  }, [driverLocation]);

  useEffect(() => {
    if (on) return;
    on = true;
    var a = window.localStorage.getItem("smartAccess");
    if (a && !auth) auth = a;
    if (!ocn(driver)) {
      fetch(`${appLink}/driverAuth/validToken`, {
        method: "GET",
        headers: { accessToken: auth },
      })
        .then(async (resp) => {
          var data = await resp.json();
          clg(data);
          if (data.error) {
            alert(data.error);
            router.push("/");
            return;
          }
          setDriver(data);
          setLoading(false);
        })
        .catch((err) => {
          clg(err);
        });
    } else {
      domap();
      docoder();
      castme();
      kickmap();
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!ocn(driver) || driver.status == stat[1]) return;
    setDriver({ ...driver, status: stat[1] });
    domap();
    docoder();
    castme();
    kickmap();
  }, [driver]);
  useEffect(() => {
    clg(pathHistory);
  }, [pathHistory]);

  if (loading) return <Loader />;

  // const mapPosition = calculateMapPosition(driverLocation);
  // const distanceFromOrigin = calculateDistance(initialPosition, driverLocation);
  // const direction = getDirectionFromOrigin(initialPosition, driverLocation);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* <Link href={`/drivers/${id}`}> */}
                <Link href={`/dashboard?auth=${auth}`}>
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
                      {driver.info.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">
                        {driver.info.username.split(" ")[0]}
                      </h2>
                      <p className={`text-sm ${getStatusColor(driver.status)}`}>
                        {driver.status} •
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block text-sm text-gray-500">
                <FiInfo className="inline mr-1" />
                {driver.bio}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-96 bg-gray-200 rounded-lg relative overflow-hidden">
              <div id="mapper" style={{ width: "100%", height: "100%" }}></div>
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
