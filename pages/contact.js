import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <section>
      <Navbar />
      <div className="min-h-screen flex px-4 md:px-0 flex-col bg-[#f2f4e6]">
        <main className="max-w-4xl mx-auto px-6  py-8 bg-white shadow-lg rounded-[40px] my-5  flex-grow">
          <h1 className="text-3xl font-bold text-[#1a491e] mb-6 ">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-6">
            Have questions or need support? Fill out the form below or reach out
            to us via email or phone.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium  mb-1" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg  bg-[#f2f5f2] focus:outline-none focus:ring focus:ring-[#43ab4c]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                className="block  text-sm font-medium mb-1"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#f2f5f2] focus:ring focus:ring-[#43ab4c]"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-2 border bg-[#f2f5f2] rounded-lg focus:outline-none focus:ring focus:ring-[#43ab4c]"
                placeholder="Type your message here"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#1a491e] text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all"
            >
              Send Message
            </button>
          </form>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              ShopMart Contact Details
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Email:</strong> support@shopmart.com
              </li>
              <li>
                <strong>Phone:</strong> +1 800 123 4567
              </li>
              <li>
                <strong>Address:</strong> 123 Main Street, Cityville, USA
              </li>
            </ul>
          </section>
        </main>
        <Footer />
      </div>
    </section>
  );
}
