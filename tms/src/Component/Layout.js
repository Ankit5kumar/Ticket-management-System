import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Left Navigation Bar */}
      <Sidebar />
      {/* <p>side bar</p> */}

      {/* Right Content Section */}
      <div className="flex-1 bg-gray-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
