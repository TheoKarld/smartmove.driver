import React from "react";

// Welcome Page Component
export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for signing up. We &apos;ve sent a verification email to
          your inbox. Please check your email and click the verification link to
          complete your registration.
        </p>
        <div className="text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500">
          Can &apos;t find the email? Check your spam folder or request a new
          verification link.
        </p>
      </div>
    </div>
  );
}
