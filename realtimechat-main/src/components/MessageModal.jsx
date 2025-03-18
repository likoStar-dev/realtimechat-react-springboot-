import axios from "axios";
import React, { useState } from "react";

const MessageModal = ({ isOpen, onClose, onSend, contactUserId }) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage();
      onClose();
      setIsError(false);
    } else {
      alert("Message cannot be empty");
      setIsError(true);
    }
  };

  if (!isOpen) return null;

  const sendMessage = async () => {
    const ContactDto = {
      userId: contactUserId,
    };
    try {
      const response1 = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${localStorage.getItem(
          "userId"
        )}/contacts`,
        ContactDto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    const time = new Date().toISOString();
    const messageDto = {
      message,
      senderId: localStorage.getItem("userId"),
      receiverId: contactUserId,
      time,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/messages`,
        messageDto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("");
      onSend();
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Send a Message</h2>
        {/* Textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full h-24 p-2 border rounded ${
            isError ? "border-red-500 border-4" : "border-gray-300"
          }`}
          placeholder="Type your message here..."
        />
        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
