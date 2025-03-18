import React from "react";
import {
  FaMapMarkedAlt,
  FaRocketchat,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="place-items-center mx-6 hover:text-green-600">
        <FaMapMarkedAlt className="w-6 h-6 " />
        map
      </div>
      <div className="place-items-center mx-6 hover:text-green-600">
        <FaMapMarkedAlt className="w-6 h-6 " />
        map
      </div>
      <div className="place-items-center mx-6 hover:text-green-600">
        <FaMapMarkedAlt className="w-6 h-6 " />
        map
      </div>
      <div
        className={`place-items-center mx-6 hover:text-green-600 ${
          window.location.href.indexOf("message") !== -1 ? "text-green-600" : ""
        }`}
        onClick={() => navigate("/message")}
      >
        <FaRocketchat className="w-6 h-6 " />
        Activity
      </div>
      <div className="place-items-center mx-6 hover:text-green-600">
        <FaMapMarkedAlt className="w-6 h-6 " />
        map
      </div>
    </div>
  );
}
