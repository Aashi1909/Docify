import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa";

const LinkPopup = ({ isOpen, onClose, link }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy the link to clipboard", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Generated Link</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 p-2 border rounded-md text-gray-700 bg-gray-100 focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaClipboard />
          </button>
        </div>
        {copySuccess && (
          <p className="text-green-500 mt-2 text-sm">Link copied to clipboard!</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LinkPopup;
