import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { api_base_url } from '../Helper';


const EmailShare = ({ isOpen, onClose, docLink, docId }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleShare = async () => {
    if (!email) {
      setMessage("Email is required!");
      return;
    }

    setIsSending(true);
    try {
      const response = await axios.post(api_base_url + "/share-via-email", {
        email,
        link: docLink,
        docId,
      });

      if (response.data.success) {
        setMessage("Email sent successfully!");
      } else {
        setMessage(response.data.message || "Failed to send email.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share Document</h3>
          <button onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleShare}
          className={`w-full p-2 text-white rounded-lg ${
            isSending ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send Email"}
        </button>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default EmailShare;
