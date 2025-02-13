// Verification Success Page Component
import React, { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";

export const Verified = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Animate check icon
    const timer = setTimeout(() => {
      setIsChecked(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <div className="relative inline-block mb-6">
          <FiCheckCircle
            className={`h-24 w-24 mx-auto transition-all duration-1000 ease-in-out ${
              isChecked
                ? "text-green-500 scale-100 opacity-100"
                : "text-gray-300 scale-50 opacity-0"
            }`}
          />
          {/* Animated path for check mark */}
          <svg
            viewBox="0 0 24 24"
            className={`absolute top-0 left-0 h-24 w-24 text-green-500 transition-all duration-1000 ease-in-out ${
              isChecked ? "opacity-100 stroke-green-500" : "opacity-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              className={`${isChecked ? "animate-draw" : "stroke-dasharray-0"}`}
            />
          </svg>
        </div>

        <h1
          className={`text-2xl font-bold mb-4 transition-all duration-1000 ${
            isChecked ? "opacity-100" : "opacity-0"
          }`}
        >
          Email Verified!
        </h1>
        <p
          className={`text-gray-600 mb-6 transition-all duration-1000 ${
            isChecked ? "opacity-100" : "opacity-0"
          }`}
        >
          Your email has been successfully verified. You can now log in to your
          account.
        </p>
        <button
          className={`w-full transition-all duration-1000 ${
            isChecked ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          onClick={() => (window.location.href = "/")}
        >
          Proceed to Login
        </button>
      </div>
    </div>
  );
};
