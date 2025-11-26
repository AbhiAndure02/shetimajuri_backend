import React from "react";
import { FaHome, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const Navigation = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Navigation('/signin')
  };

  return (
    <div className="w-64 h-screen bg-green-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <a
          href="/admin/dashboard"
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
        >
          <FaHome /> Dashboard
        </a>
        <a
          href="/admin/users"
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
        >
          <FaUsers /> Users
        </a>
      </nav>
      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 p-2 rounded bg-red-600 hover:bg-red-700 transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
