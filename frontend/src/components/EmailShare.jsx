import React, { useState } from "react";
import { api_base_url } from "../Helper";

const EmailShareModal = ({ isOpen, onClose, docs }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    setIsSending(true);

    try {
      // Call the share-via-email API
      const response = await fetch(api_base_url + "/share-via-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, docId: docs._id }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email: " + data.message);
      }
    } catch (error) {
      alert("An error occurred while sending the email.");
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-lg font-semibold mb-4">Share Document via Email</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter recipient's email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
            onClick={handleSendEmail}
            disabled={isSending || !email}
          >
            {isSending ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EmailShareModal;
