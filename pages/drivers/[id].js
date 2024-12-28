import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const allDrivers = [
  {
    id: 1,
    name: "John Doe",
    status: "Available",
    bio: "Experienced driver with over 5 years of service.",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "On Route",
    bio: "Specializes in long-distance deliveries.",
  },
  {
    id: 3,
    name: "Michael Brown",
    status: "Unavailable",
    bio: "Taking some time off for personal reasons.",
  },
  {
    id: 4,
    name: "Anna White",
    status: "Available",
    bio: "Friendly and punctual with excellent customer reviews.",
  },
  {
    id: 5,
    name: "David Black",
    status: "On Route",
    bio: "Known for timely and safe deliveries.",
  },
  {
    id: 6,
    name: "Emily Rose",
    status: "Available",
    bio: "New to the team, eager to prove herself.",
  },
  {
    id: 7,
    name: "Chris Green",
    status: "Unavailable",
    bio: "Currently on vacation.",
  },
  {
    id: 8,
    name: "Alex Brown",
    status: "On Route",
    bio: "Efficient and reliable driver.",
  },
];

export default function DriverProfile() {
  const router = useRouter();
  const { id } = router.query;

  const driver = allDrivers.find((d) => d.id === parseInt(id, 10));

  if (!driver) {
    return (
      <div className="text-center mt-10 text-gray-600">Driver not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg my-5 flex-grow">
        {/* Driver Header */}
        <div className="flex items-center space-x-4 bg-gradient-to-r from-[#557C56] to-[#3D593E] rounded-lg p-6 mb-8">
          {/* Circular Avatar */}
          <div className="w-20 h-20 bg-white text-[#1f321f] flex items-center justify-center rounded-full text-3xl font-semibold shadow-lg">
            {driver.name.charAt(0)}
          </div>
          {/* Driver Info */}
          <div>
            <h1 className="text-4xl font-bold text-white">{driver.name}</h1>
            <p
              className={`mt-2 px-6 py-2 rounded-lg text-sm inline-block font-medium text-white ${
                driver.status === "Available"
                  ? "bg-green-500"
                  : driver.status === "On Route"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {driver.status}
            </p>
          </div>
        </div>

        {/* Bio Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bio</h2>
          <p className="text-gray-600">{driver.bio}</p>
        </section>

        {/* Additional Info Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Driver Details
          </h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <strong>Phone:</strong> +1 234 567 890
            </li>
            <li>
              <strong>Email:</strong>{" "}
              {driver.name.toLowerCase().replace(" ", ".")}@shopmart.com
            </li>
            <li>
              <strong>Vehicle:</strong> Toyota HiAce 2021
            </li>
          </ul>

          {/* Actions Section */}
          {(driver.status === "Available" || driver.status === "On Route") && (
            <div className="mt-8">
              <div className="flex justify-center">
                <Link
                  href={`/tracking-map?id=${
                    driver.id
                  }&name=${encodeURIComponent(driver.name)}&status=${
                    driver.status
                  }&bio=${encodeURIComponent(driver.bio)}`}
                >
                  <button className="bg-gradient-to-r from-[#557C56] to-[#3D593E] text-white md:px-10 lg:px-40 px-6 py-3 rounded-lg shadow-lg hover:from-[#1b391c] hover:to-[#213021] transition-all duration-300 flex items-center justify-center gap-2">
                    <span>Start Tracking</span>
                    {driver.status === "On Route" && (
                      <span className="animate-pulse">●</span>
                    )}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
