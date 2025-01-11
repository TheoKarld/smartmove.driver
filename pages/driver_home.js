import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaTruck,
  FaCog,
  FaSignOutAlt,
  FaBox,
  FaRoute,
} from "react-icons/fa";
import Link from "next/link";

export default function DriverHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <nav className="bg-white shadow-lg py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 text-2xl text-blue-600">
              <FaTruck />
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              Driver Dashboard
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaTachometerAlt className="text-xl" />
              <span className="font-semibold">Dashboard</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaUser className="text-xl" />
              <span className="font-semibold">Profile</span>
            </Link>
            <Link
              href="/active-deliveries"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaTruck className="text-xl" />
              <span className="font-semibold">Deliveries</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaCog className="text-xl" />
              <span className="font-semibold">Settings</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-semibold">Logout</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome Back, Driver!</h1>
          <p className="text-xl text-blue-100 mb-10">
            Track deliveries, manage routes, and boost your performance in
            real-time
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tracking-map"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg transform hover:scale-105"
            >
              Start Tracking
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg transform hover:scale-105"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Stats Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-4 text-blue-600">
              <FaBox />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Delivery History
            </h2>
            <p className="text-gray-600 mb-6">
              Track your performance and view completed deliveries
            </p>
            <Link
              href="/delivery-history"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View History
            </Link>
          </div>

          {/* Active Routes Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-4 text-blue-600">
              <FaRoute />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Active Routes
            </h2>
            <p className="text-gray-600 mb-6">
              Check your current routes and delivery status
            </p>
            <Link
              href="/active-routes"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Routes
            </Link>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-4 text-blue-600">
              <FaCog />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Driver Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Update your profile and vehicle information
            </p>
            <Link
              href="/driver-settings"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Settings
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              © 2024 SMARTMOVE. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
