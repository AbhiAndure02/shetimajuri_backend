import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    paidUsers: 0,
    pendingUsers: 0,
    totalRevenue: 0,
    recentSignups: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Fetch all users
      const usersRes = await fetch("/api/auth/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!usersRes.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await usersRes.json();

      // Calculate dashboard metrics
      const totalUsers = users.length;
      const paidUsers = users.filter(user => user.isPaymentConfirm === true).length;
      const pendingUsers = users.filter(user => user.isPaymentConfirm === false || !user.isPaymentConfirm).length;
      
      // Calculate revenue (assuming ₹50 registration fee per paid user)
      const registrationFee = 50;
      const totalRevenue = paidUsers * registrationFee;

      // Calculate recent signups (users created in last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentSignups = users.filter(user => {
        const userDate = new Date(user.createdAt || user.dateCreated || Date.now());
        return userDate > oneWeekAgo;
      }).length;

      setDashboardData({
        totalUsers,
        paidUsers,
        pendingUsers,
        totalRevenue,
        recentSignups
      });

    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ Refresh data function
  const refreshData = () => {
    setError(null);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard 👋</h1>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Dashboard Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Users</h2>
                <p className="text-3xl font-bold text-blue-600">{dashboardData.totalUsers}</p>
              </div>
              <div className="text-blue-500 text-3xl">👥</div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              All registered users in the system
            </div>
          </div>

          {/* Paid Users Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Payment Confirmed</h2>
                <p className="text-3xl font-bold text-green-600">{dashboardData.paidUsers}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {dashboardData.totalUsers > 0 
                    ? `${Math.round((dashboardData.paidUsers / dashboardData.totalUsers) * 100)}% of total`
                    : '0% of total'
                  }
                </p>
              </div>
              <div className="text-green-500 text-3xl">✅</div>
            </div>
          </div>

          {/* Pending Payment Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Pending Payment</h2>
                <p className="text-3xl font-bold text-yellow-600">{dashboardData.pendingUsers}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {dashboardData.totalUsers > 0 
                    ? `${Math.round((dashboardData.pendingUsers / dashboardData.totalUsers) * 100)}% of total`
                    : '0% of total'
                  }
                </p>
              </div>
              <div className="text-yellow-500 text-3xl">⏳</div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Revenue</h2>
                <p className="text-3xl font-bold text-purple-600">₹{dashboardData.totalRevenue}</p>
                <p className="text-sm text-gray-500 mt-1">
                  ₹50 registration fee per user
                </p>
              </div>
              <div className="text-purple-500 text-3xl">💰</div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Signups Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Signups (7 days)</h2>
              <span className="text-2xl">📈</span>
            </div>
            <p className="text-4xl font-bold text-green-600">{dashboardData.recentSignups}</p>
            <p className="text-gray-600 mt-2">New users registered this week</p>
          </div>

          {/* Payment Status Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Status Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Confirmed Payments</span>
                <span className="font-semibold text-green-600">{dashboardData.paidUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Payments</span>
                <span className="font-semibold text-yellow-600">{dashboardData.pendingUsers}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Users</span>
                  <span>{dashboardData.totalUsers}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.href = '/users'}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Manage Users
            </button>
            <button 
              onClick={refreshData}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;