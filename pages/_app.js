import "@/styles/globals.css";
import "@/js/leaflet/leaflet.css";
import "@/js/leaflet/geocoder.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  var [driver, setDriver] = useState({});
  return (
    <Component
      {...pageProps}
      appLink={"https://maptest-bjc5.onrender.com"}
      months={"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",")}
      stat={"Available,On Route".split(",")}
      driver={driver}
      setDriver={setDriver}
    />
  );
}
//http://localhost:3003
