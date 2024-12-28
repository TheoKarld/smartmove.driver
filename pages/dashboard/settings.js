import React, { useState } from "react";
import Link from "next/link";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    emailNotifs: true,
    smsNotifs: false,
    pushNotifs: true,
    deliveryUpdates: true,
    routeChanges: true,
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "english",
    timezone: "UTC-5",
    distanceUnit: "miles",
    currency: "usd",
  });

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleToggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 text-blue-600 hover:text-blue-700"
          >
            <span>👈</span>
            <span>🏠</span>
            <span className="text-xl font-bold">ShopMart</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Alert */}
        {showSaveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-800">
            <span className="text-lg font-semibold">✔️ Success</span>
            <p>Your settings have been saved successfully.</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <div className="flex items-center space-x-4 border-b pb-6">
            <span className="p-3 bg-blue-100 rounded-lg text-blue-600">⚙️</span>
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          </div>

          {/* Notifications Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
              <span>🔔</span>
              <h2 className="text-xl font-semibold text-gray-800">
                Notifications
              </h2>
            </div>
            <div className="space-y-4 pl-8">
              {Object.entries({
                emailNotifs: "Email Notifications",
                smsNotifs: "SMS Notifications",
                pushNotifs: "Push Notifications",
                deliveryUpdates: "Delivery Updates",
                routeChanges: "Route Changes",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span>{label}</span>
                  <button
                    onClick={() => handleToggleNotification(key)}
                    className={`px-4 py-2 rounded-full text-white ${
                      notifications[key] ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  >
                    {notifications[key] ? "✅" : "❌"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Preferences Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
              <span>🎨</span>
              <h2 className="text-xl font-semibold text-gray-800">
                Preferences
              </h2>
            </div>
            <div className="space-y-4 pl-8">
              {/* Theme Selection */}
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <select
                  value={preferences.theme}
                  onChange={(e) =>
                    handlePreferenceChange("theme", e.target.value)
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              {/* Language Selection */}
              <div className="flex items-center justify-between">
                <span>Language</span>
                <select
                  value={preferences.language}
                  onChange={(e) =>
                    handlePreferenceChange("language", e.target.value)
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                </select>
              </div>

              {/* Timezone Selection */}
              <div className="flex items-center justify-between">
                <span>Timezone</span>
                <select
                  value={preferences.timezone}
                  onChange={(e) =>
                    handlePreferenceChange("timezone", e.target.value)
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="UTC-5">UTC-5</option>
                  <option value="UTC+1">UTC+1</option>
                </select>
              </div>

              {/* Distance Unit Selection */}
              <div className="flex items-center justify-between">
                <span>Distance Unit</span>
                <select
                  value={preferences.distanceUnit}
                  onChange={(e) =>
                    handlePreferenceChange("distanceUnit", e.target.value)
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="miles">Miles</option>
                  <option value="kilometers">Kilometers</option>
                </select>
              </div>

              {/* Currency Selection */}
              <div className="flex items-center justify-between">
                <span>Currency</span>
                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    handlePreferenceChange("currency", e.target.value)
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                </select>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              💾 Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
