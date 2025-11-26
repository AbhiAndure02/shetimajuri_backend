import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const User = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/auth/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Delete user by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/auth/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        alert("User deleted ✅");
        fetchUsers();
      } else {
        const error = await res.json();
        alert(error.message || "Delete failed ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ✅ Toggle Payment Confirmation Status
  const togglePaymentConfirm = async (user) => {
    const newStatus = !user.isPaymentConfirm;
    
    try {
      const res = await fetch(`/api/auth/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...user,
          isPaymentConfirm: newStatus
        }),
      });

      if (res.ok) {
        alert(`Payment status ${newStatus ? "confirmed ✅" : "unconfirmed ❌"}`);
        fetchUsers();
      } else {
        const error = await res.json();
        alert(error.message || "Update failed ❌");
      }
    } catch (error) {
      console.error("Toggle payment error:", error);
    }
  };

  // ✅ Update user
  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/auth/${editUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editUser),
      });

      if (res.ok) {
        alert("User updated ✅");
        setEditUser(null);
        fetchUsers();
      } else {
        const error = await res.json();
        alert(error.message || "Update failed ❌");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">👤 All Users</h1>

        {/* ✅ User Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Payment Name</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.paymeName}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.isPaymentConfirm 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {user.isPaymentConfirm ? "Confirmed ✅" : "Pending ❌"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => togglePaymentConfirm(user)}
                      className={`px-3 py-1 rounded text-white ${
                        user.isPaymentConfirm 
                          ? "bg-yellow-500 hover:bg-yellow-600" 
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {user.isPaymentConfirm ? "Unconfirm" : "Confirm"}
                    </button>
                    <button
                      onClick={() => setEditUser(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Edit Modal - Updated to include Payment Status */}
        {editUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Edit User</h2>

              <label className="block mb-2">Name</label>
              <input
                className="w-full p-2 border rounded mb-3"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />

              <label className="block mb-2">Phone</label>
              <input
                className="w-full p-2 border rounded mb-3"
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
              />

              <label className="block mb-2">District</label>
              <input
                className="w-full p-2 border rounded mb-3"
                value={editUser.district}
                onChange={(e) =>
                  setEditUser({ ...editUser, district: e.target.value })
                }
              />

              <label className="block mb-2">Village</label>
              <input
                className="w-full p-2 border rounded mb-3"
                value={editUser.village}
                onChange={(e) =>
                  setEditUser({ ...editUser, village: e.target.value })
                }
              />

              {/* Payment Status Toggle in Edit Modal */}
              <div className="flex items-center mb-3">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={editUser.isPaymentConfirm || false}
                      onChange={(e) =>
                        setEditUser({ 
                          ...editUser, 
                          isPaymentConfirm: e.target.checked 
                        })
                      }
                    />
                    <div className={`block w-10 h-6 rounded-full ${
                      editUser.isPaymentConfirm ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      editUser.isPaymentConfirm ? 'transform translate-x-4' : ''
                    }`}></div>
                  </div>
                  <div className="ml-3 text-gray-700 font-medium">
                    Payment Confirmed
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;