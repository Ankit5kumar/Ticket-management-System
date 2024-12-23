import React from 'react';
import AdminPanel from '../Component/Admin';
import ManagerPanel from '../Component/Manager';
import UserPanel from '../Component/User';

const Dashboard = () => {
//   const { role } = user; // Assume role is 'Admin', 'Manager', or 'User'
let userinfo = localStorage.getItem("userInfo")
let userobj = JSON.parse(userinfo);

const Role = userobj.roles[0]
  return (
    <div className="p-8 space-y-6">
      {/* <roro/> */}
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {Role === 'Admin' && <AdminPanel />}
      {Role === 'Manager' && <ManagerPanel />}
      {Role === 'User' && <UserPanel />}
    </div>
  );
};

export default Dashboard;
