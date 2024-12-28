import Link from "next/link";
import { useState } from "react";
import { FiHome } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#1f321f] text-yellow-100 py-4">
      <nav className="md:flex block md:items-center justify-between px-6 w-full">
        {/* Logo */}
        <div className="flex justify-between">
          <Link href="/" className="">
            <div className="flex">
              <FiHome className="w-6 h-6 text-yellow-100" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-100 to-white bg-clip-text text-transparent pl-2">
                ShopMart
              </span>
            </div>
          </Link>

          {/* Hamburger Menu for Small Screens */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-yellow-100 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } sm:flex sm:space-x-6 space-y-4 sm:space-y-0 sm:flex-row flex-col ml-auto sm:bg-transparent bg-[#1f5023] sm:text-yellow-100 sm:py-0 py-4 sm:px-6 px-4 transition-all duration-300 ease-in-out`}
        >
          <li>
            <Link href="/" className="hover:text-gray-200 block py-2 sm:py-0">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/drivers"
              className="hover:text-gray-200 block py-2 sm:py-0"
            >
              Drivers
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="hover:text-gray-200 block py-2 sm:py-0"
            >
              Driver login
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-gray-200 block py-2 sm:py-0"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
