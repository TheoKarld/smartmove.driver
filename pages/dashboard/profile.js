import React, { useState } from "react";
import Link from "next/link";
import {
  FaSignOutAlt,
  FaStar,
  FaBox,
  FaCalendarAlt,
  FaSave,
  FaTimes,
  FaEdit,
  FaTruck,
} from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdHome,
  MdDirectionsCar,
  MdMap,
} from "react-icons/md";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@shopmart.com",
    phone: "+1 (555) 123-4567",
    address: "123 Delivery Street, City, State 12345",
    vehicleType: "Sedan",
    licenseNumber: "DL-123456",
    startDate: "Jan 2023",
    deliveriesCompleted: 1284,
    rating: 4.9,
    preferredZones: "Downtown, Suburbs",
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 4000);
  };

  const getInitials = () => `${profile.firstName[0]}${profile.lastName[0]}`;

  const infoFields = [
    {
      label: "Email",
      value: profile.email,
      icon: <MdEmail className="text-[#3D593E] text-2xl" />,
    },
    {
      label: "Phone",
      value: profile.phone,
      icon: <MdPhone className="text-[#3D593E] text-2xl" />,
    },
    {
      label: "Address",
      value: profile.address,
      icon: <MdHome className="text-[#3D593E] text-2xl" />,
    },
    {
      label: "Vehicle Type",
      value: profile.vehicleType,
      icon: <MdDirectionsCar className="text-[#3D593E] text-2xl" />,
    },
    {
      label: "License Number",
      value: profile.licenseNumber,
      icon: <FaEdit className="text-[#3D593E] text-2xl" />,
    },
    {
      label: "Preferred Zones",
      value: profile.preferredZones,
      icon: <MdMap className="text-[#3D593E] text-2xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 text-[#3D593E] hover:text-[#28632a]"
          >
            <span className="text-xl font-bold">Dashboard</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center space-x-3 text-blue-600 hover:text-blue-700"
          >
            <button
              className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
              aria-label="Logout"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {showSaveSuccess && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-600 p-4 rounded-lg shadow-lg">
            <strong className="text-green-600 font-semibold">Success:</strong>
            <p className="text-green-800">
              Your profile has been updated successfully.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#557C56] to-[#3D593E] text-white md:px-8 md:py-8 px-4 py-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#3D593E] text-3xl font-bold">
                {getInitials()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
                <p className="text-blue-100 flex items-center mt-2">
                  Professional Driver
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-auto bg-white text-[#3D593E] px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  aria-label="Edit Profile"
                >
                  <div className="flex items-center justify-center">
                    <FaEdit /> Edit Profile
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-gray-50">
            {[
              {
                icon: <FaStar className="text-yellow-500 mx-auto text-3xl" />,
                value: profile.rating,
                label: "Rating",
              },
              {
                icon: <FaBox className="text-blue-500 mx-auto text-3xl" />,
                value: profile.deliveriesCompleted,
                label: "Deliveries",
              },
              {
                icon: (
                  <FaCalendarAlt className="text-green-500 mx-auto text-3xl" />
                ),
                value: profile.startDate,
                label: "Member Since",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white rounded-xl shadow-sm"
              >
                {stat.icon}
                <div className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Profile Content */}
          <div className="p-8 space-y-6">
            {isEditing ? (
              <div className="space-y-6">
                {infoFields.map(({ label, value }, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {label}
                    </label>
                    <input
                      type={label === "Email" ? "email" : "text"}
                      value={value}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          [label.toLowerCase().replace(/ /g, "")]:
                            e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}

                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <FaSave /> Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {infoFields.map(({ label, value, icon }, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {icon}
                    <div>
                      <p className="text-sm text-gray-600">{label}</p>
                      <p className="text-lg text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
