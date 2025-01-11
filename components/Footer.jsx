import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#1f321f] text-yellow-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Branding Section */}
          <div>
            <h2 className="text-xl font-bold">SMARTMOVE</h2>
            <p className="text-sm">
              Delivering seamless tracking and logistics solutions.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="https://facebook.com" target="_blank">
              <FiFacebook
                size={20}
                className="hover:text-gray-200 cursor-pointer"
              />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FiTwitter
                size={20}
                className="hover:text-gray-200 cursor-pointer"
              />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FiInstagram
                size={20}
                className="hover:text-gray-200 cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-3 text-sm text-center">
          <Link href="/privacy">
            <span className="cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </Link>
          {" | "}
          <Link href="/terms">
            <span className="cursor-pointer hover:underline">
              Terms of Service
            </span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-2 text-xs text-center">
          &copy; 2024 SMARTMOVE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
