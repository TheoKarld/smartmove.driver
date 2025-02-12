import "@/styles/globals.css";
import "@/js/leaflet/leaflet.css";
import "@/js/leaflet/geocoder.css";
import "@/css/styleit.css";
import "@/css/tailwind.output.css";
import { useState } from "react";
import { io } from "socket.io-client";

export default function App({ Component, pageProps }) {
  var appLink = "https://maptest-bjc5.onrender.com",
    [driver, setDriver] = useState({}),
    [socket, setSocket] = useState(io.connect(appLink)); //http://localhost:3003
  return (
    <Component
      {...pageProps}
      appLink={appLink}
      months={"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",")}
      stat={"Available,On Route".split(",")}
      driver={driver}
      setDriver={setDriver}
      socket={socket}
    />
  );
}
//https://maptest-bjc5.onrender.com
