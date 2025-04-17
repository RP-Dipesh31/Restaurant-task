import React from "react";
import { FaLock } from "react-icons/fa";

const Unauthorized: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md text-center border border-red-200">
        <div className="flex justify-center mb-4 text-red-500 text-6xl">
          <FaLock />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">403 - Unauthorized</h2>
        <p className="text-gray-600 mb-6">
          Sorry, you do not have permission to view this page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-full transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
