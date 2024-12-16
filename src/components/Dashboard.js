import React, { useState, useEffect } from "react";
import photo1 from "../assets/image.png";

const Dashboard = () => {
  const [adminName, setAdminName] = useState("Loading...");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetching user details from localStorage
  useEffect(() => {
    const fetchUserDetails = () => {
      const firstName = localStorage.getItem("first_name");
      console.log("First Name from localStorage: ", firstName);

      if (firstName) {
        setAdminName(`${firstName}`);
      } else {
        setAdminName("Admin");
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("first_name");

    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-[#36517C] text-white shadow-md py-4 px-6 flex justify-between items-center relative">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-white"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="flex items-center space-x-4">
          <img
            className="absolute top-3 left-12 lg:left-4 w-24 h-10 lg:w-32 lg:h-12"
            src={photo1}
            alt=""
          />
        </div>

        <div className="flex items-center space-x-2">
          {" "}
          <p className="text-lg font-medium">{adminName}</p>
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.FdADUfEOOFm2lB114GY5UQHaHa&pid=Api&P=0&h=220"
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
          <button
            onClick={handleLogout}
            className="hidden lg:block bg-red-500 hover:bg-red-600 text-white px-1 py-2 lg:py-2 lg:px-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block w-64 bg-white shadow-lg p-4 transition-all duration-300`}
        >
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
          <ul className="space-y-2">
            <li className="text-gray-700 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              Dashboard
            </li>
            <li className="text-gray-700 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              Reports
            </li>
            <li className="text-gray-700 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              Settings
            </li>
          </ul>

          {/* Logout button inside the sidebar (only visible on mobile) */}
          <button
            onClick={handleLogout}
            className="lg:hidden bg-red-500 hover:bg-red-600 text-white px-1 py-2 ml-1 lg:py-2 lg:px-4 rounded-lg text-sm mt-4"
          >
            Logout
          </button>
        </aside>

        <section className="flex-grow p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Dashboard Overview
            </h2>
            <p className="text-gray-500">
              Here you can manage your account, view reports, and customize
              settings.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#36517C] text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
