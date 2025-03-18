import { Handle } from "@xyflow/react";
import React from "react";

export default function UserInfo({ onSend }) {
  return (
    <div>
      <div className="absolute top-12 left-0 bg-white p-5 rounded-lg shadow-lg w-56 z-10">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="py-2">
            <h2 className="text-xl font-bold">Opposum</h2>
            <p className="text-gray-500">opposum0720</p>
          </div>
        </div>
        <hr />
        {/* Menu Items */}
        <ul>
          <li>
            <button className="w-full text-left py-2 hover:bg-gray-100">
              Mute Notification
            </button>
          </li>
          <li>
            <button className="w-full text-left py-2 hover:bg-gray-100">
              Report
            </button>
          </li>
          <li>
            <button className="w-full text-left py-2 hover:bg-gray-100">
              Ignore messages
            </button>
          </li>
          <li>
            <button className="w-full text-left py-2 hover:bg-gray-100">
              Block
            </button>
          </li>
          <li>
            <button className="w-full text-left py-2 text-red-500 hover:bg-red-50">
              Delete Chat
            </button>
          </li>
        </ul>
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onSend}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
