import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className=" bg-[#1a491e]  py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 text-yellow-600">
          Welcome to ShopMart!
        </h1>
        <p className="text-xl mb-4 text-yellow-100">
          ShopMart is your reliable partner in efficient and timely delivery.{" "}
          <br /> We connect customers with trusted drivers to meet your
          logistics needs.
        </p>
      </section>

      {/* Main Content Section */}
      <section className="px-6 my-10">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Explore Our Drivers
        </h2>

        {/* Cards for All Drivers and Drivers on Route */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto gap-6">
          {/* All Drivers Card */}
          <div className="border rounded-lg border-yellow-600 p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-center mb-4">
              All Drivers
            </h3>
            <p className="text-center mb-4">
              Explore all drivers registered on our platform.
            </p>
            <Link href="/drivers" className="flex justify-center">
              <button className="bg-yellow-600 text-white py-3 px-6 md:px-10 lg:px-20 rounded-lg hover:bg-yellow-900 transition-all">
                View All Drivers
              </button>
            </Link>
          </div>

          {/* Drivers on Route Card */}
          <div className="border border-[#2c7332] rounded-lg p-6 bg-white shadow-lg hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Drivers on Route
            </h3>
            <p className="text-center mb-4">
              Track drivers currently on route in real-time.
            </p>
            <Link href="/drivers/on-route" className="flex justify-center">
              <button className="bg-[#2c7332] text-white py-3 px-6 md:px-10 lg:px-20 rounded-lg hover:bg-green-700 transition-all">
                View Active Drivers
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
