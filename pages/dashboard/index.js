import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiTruck,
  FiDollarSign,
  FiClock,
  FiMapPin,
  // FiClipboard,
  FiCalendar,
  FiActivity,
  FaSignOutAlt,
  FiPlus,
} from "react-icons/fi";
import { barme, clg, datemap, ocn, parse, percentage } from "@/js/basic";
import Loader from "@/components/Loader";

export default function Dashboard(props) {
  var on = "",
    router = useRouter(),
    { appLink, months, driver, setDriver, socket } = props,
    { auth } = router.query,
    [loading, setLoading] = useState(true),
    date = datemap(),
    month = months[date.m],
    [funds, setFunds] = useState(0),
    [actives, setActives] = useState("0 hrs"),
    [delis, setDelis] = useState(0),
    [delisdif, setDelisdif] = useState("+0"),
    [fundsdif, setFundsdif] = useState("+0"),
    [activesdif, setActivesdif] = useState("+0"),
    [color1, setColor1] = useState("text-black"),
    [color2, setColor2] = useState("text-black"),
    [color3, setColor3] = useState("text-black");
  const handleStartTracking = () => {
    router.push(`/dashboard/map?auth=${auth}`);
  };

  const statsCards = [
    {
      icon: <FiTruck className="w-6 h-6" />,
      title: "Total Deliveries",
      value: `${delis}`,
      trend: `${delisdif}% from last month`,
      color: "text-blue-600",
      color2: `${color1}`,
    },
    {
      icon: <FiPlus className="w-6 h-6" />,
      title: "Total Earnings",
      value: `N${funds}`,
      trend: `${fundsdif}% from last month`,
      color: "text-green-600",
      color2: `${color2}`,
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Active Hours",
      value: `${actives}`,
      trend: `${activesdif}% from last month`,
      color: "text-purple-600",
      color2: `${color3}`,
    },
  ];

  const recentActivities = [
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Delivery to Downtown",
      date: "Dec 8, 2024",
      status: "Completed",
    },
    {
      icon: <FiTruck className="w-5 h-5" />,
      title: "Long-distance Route",
      date: "Dec 5, 2024",
      status: "Completed",
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      title: "Pending Assignment",
      date: "Dec 10, 2024",
      status: "Pending",
    },
  ];

  function updatedelis() {
    var x = lastdelis(),
      b = ocn(driver.earnings[date.y][month].deliveries) + 40,
      c;
    setDelis(b);
    if (parse(date.m) == 0) return;
    if (b > x) {
      c = percentage(x, b - x, 2);
      clg(c);
      setDelisdif(`+${x == 0 ? b : c}`);
      setColor1("text-green-600");
    } else if (b < x) {
      c = percentage(x, x - b, 2);
      clg(c);
      setDelisdif(`-${c}`);
      setColor1("text-red-600");
    }
  }
  function lastdelis() {
    if (parse(date.m) == 0) return 20;
    return ocn(driver.earnings[date.y][month].deliveries);
  }
  function updateactives() {}
  function updatefunds() {clg(date.y);
    var x = lastfunds(),
      a = driver.earnings[date.y][month].funds,
      b = 0,
      c;
    for (var i in a) b += parse(a[i]);
    setFunds(b ? barme(b) : 0);
    if (parse(date.m) == 0) return;
    if (b > x) {
      c = percentage(x, b - x, 2);
      clg(c);
      setFundsdif(`+${c}`);
      setColor2("text-green-600");
    } else if (b < x) {
      c = percentage(x, x - b, 2);
      clg(c);
      setFundsdif(`-${b == 0 ? x : c}`);
      setColor2("text-red-600");
    }
  }
  function lastfunds() {
    if (parse(date.m) == 0) return 0;
    var a = driver.earnings[date.y][month].funds,
      b = 0;
    for (var i in a) b += parse(a[i]);
    return b;
  }
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
      setLoading(false);
    }
    socket.on("ios", (o) => {
      clg("dash");
      clg(o);
    });
  }, []);
  useEffect(() => {
    if (!ocn(driver)) return;
    updatefunds();
    updatedelis();
    updateactives();
  }, [driver]);
  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href={`/dashboard/home?auth=${auth}`}
              className="flex items-center space-x-3"
            >
              <FiHome className="w-6 h-6 text-[#3D593E]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#557C56] to-[#3D593E] bg-clip-text text-transparent">
                SMARTMOVE
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href={`/dashboard/home?auth=${auth}`}
                className="nav-icon-link"
              >
                <FiHome className="w-5 h-5" />
              </Link>
              <Link href="/dashboard/profile" className="nav-icon-link">
                <FiUser className="w-5 h-5" />
              </Link>
              <Link href="/dashboard/settings" className="nav-icon-link">
                <FiSettings className="w-5 h-5" />
              </Link>
              {/* <button className="nav-icon-link text-red-500 hover:text-red-600">
                <FiLogOut className="w-5 h-5" />
              </button> */}
              <a
                onClick={() => {
                  window.localStorage.removeItem("smartAccess");
                  router.push("/");
                }}
                className="flex items-center space-x-3 text-blue-600 hover:text-blue-700"
              >
                <button
                  className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                  aria-label="Logout"
                >
                  <FiLogOut className="w-5 h-5" />
                  {/* <span>Logout</span> */}
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {ocn(driver) ? driver.info.username : ""}
          </h1>
          <p className="text-gray-600">Your delivery metrics at a glance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${card.color}`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <p className={`text-xs mt-1 ${card.color2}`}>
                      {card.trend}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiActivity className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activities
                </h2>
                <Link
                  href="/dashboard/activities"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold flex items-center mb-6">
                <FiMapPin className="w-5 h-5 mr-2 text-blue-600" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleStartTracking}
                  className="quick-action-button bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  <div className="flex justify-center items-center py-3 text-white">
                    <FiTruck className="w-5 h-5" />
                    <span className="pl-2">Start Tracking</span>
                  </div>
                </button>
                <Link
                  href="/dashboard/schedule"
                  className="quick-action-button bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  <div className="flex justify-center items-center py-3 text-white">
                    <FiCalendar className="w-5 h-5" />
                    <span className="pl-2">View Schedule</span>
                  </div>
                </Link>
                <Link
                  href="/dashboard/earnings"
                  className="quick-action-button bg-purple-600 hover:bg-purple-700 rounded-lg"
                >
                  <div className="flex justify-center items-center py-3 text-white">
                    <FiDollarSign className="w-5 h-5" />
                    <span className="pl-2">Earnings</span>
                  </div>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="quick-action-button bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                  <div className="flex justify-center items-center py-3 text-white">
                    <FiUser className="w-5 h-5 " />
                    <span className="pl-2">Profile</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              &copy; 2024 SMARTMOVE. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/dashboard/privacy"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Privacy Policy
              </Link>
              <Link
                href="/dashboard/terms"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
