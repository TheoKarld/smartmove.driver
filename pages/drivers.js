import { useState, useEffect } from "react";
import { debounce } from "lodash"; // Install lodash for debounce
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allDrivers = [
  { id: 1, name: "John Doe", status: "Available" },
  { id: 2, name: "Jane Smith", status: "On Route" },
  { id: 3, name: "Michael Brown", status: "Unavailable" },
  { id: 4, name: "Anna White", status: "Available" },
  { id: 5, name: "David Black", status: "On Route" },
  { id: 6, name: "Emily Rose", status: "Available" },
  { id: 7, name: "Chris Green", status: "Unavailable" },
  { id: 8, name: "Alex Brown", status: "On Route" },
  { id: 9, name: "John Doe", status: "Available" },
  { id: 10, name: "Jane Smith", status: "On Route" },
  { id: 11, name: "Michael Brown", status: "Unavailable" },
  { id: 12, name: "Anna White", status: "Available" },
  { id: 13, name: "David Black", status: "On Route" },
  { id: 14, name: "Anna White", status: "Available" },
  { id: 15, name: "David Black", status: "On Route" },
];

export default function Drivers() {
  const [drivers, setDrivers] = useState(allDrivers.slice(0, 8)); // Show 8 drivers initially
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const debounced = debounce(() => setDebouncedSearch(search), 500);
    debounced();
    return () => debounced.cancel();
  }, [search]);

  const handleLoadMore = () => {
    const newDrivers = allDrivers.slice(drivers.length, drivers.length + 4);
    setDrivers((prevDrivers) => [...prevDrivers, ...newDrivers]);
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      driver.status.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-[#1a491e] mb-8">
          All Drivers
        </h1>

        {/* Search */}
        <div className="mb-8 w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search drivers..."
            className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDrivers.map((driver) => (
            <Link key={driver.id} href={`/drivers/${driver.id}`}>
              <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow p-6 cursor-pointer transform hover:scale-105">
                <h2 className="text-2xl font-medium text-[#1a491e] mb-2">
                  {driver.name}
                </h2>
                <p
                  className={`px-4 py-2 rounded-lg text-sm font-semibold inline-block ${
                    driver.status === "Available"
                      ? "bg-green-200 text-green-800"
                      : driver.status === "On Route"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {driver.status}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        {drivers.length < allDrivers.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-[#557C56] to-[#3D593E] text-white px-6 py-3 rounded-lg shadow-md hover:from-[#1b391c] hover:to-[#213021] transition-all duration-300 ease-in-out"
            >
              Load More
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
