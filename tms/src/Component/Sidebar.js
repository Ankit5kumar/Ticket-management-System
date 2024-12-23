import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  let userinfo = localStorage.getItem("userInfo")
  const navigate = useNavigate();
let userobj = JSON.parse(userinfo);
let Role = userobj.roles[0]
const handlelogout = ()=>{
  Cookies.remove("token");
}
return (
  <div className="w-64 bg-blue-800 text-white h-full p-4">
    <h2 className="text-2xl font-bold mb-6">Navigation</h2>
    {Role === "Admin" && (  <ul className="space-y-4">
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/profile">Task</Link></li>
      <li><Link to="/settings">Users</Link></li>
      <li onClick={handlelogout}><Link to="/">Logout</Link></li>
    </ul>)}
  {Role === "User" && (
    <ul className="space-y-4 ">
    <li><Link to="/dashboard">Dashboard</Link></li>
    <li><Link to="/UserTask">Task</Link></li>
    <li><Link to="/Profile">Profile</Link></li>
    <li onClick={handlelogout}><Link to="/">Logout</Link></li>
  </ul>
  )}
  {Role === "Manager" && (
    <ul className="space-y-4 ">
    <li className=''><Link to="/dashboard">Dashboard</Link></li>
    <li><Link to="/team">Team</Link></li>
    <li><Link to="/task">Task</Link></li>
    <li onClick={handlelogout}><Link to="/">Logout</Link></li>
  </ul>
  )}
  </div>
);
};
export default Sidebar;
  

  

