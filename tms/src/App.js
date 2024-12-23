import Login from "../src/Pages/page";
import AdminPanel from "./Component/Admin";
import Layout from "./Component/Layout";
import Dashboard from "./Pages/Dashboard";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerPanel from "./Component/Manager";
import { AuthProvider } from "./Context/AuthContext";
import Team from "./Pages/Team";
import Task from "./Pages/Task";
import ProtectedRoute from "./Component/ProtectedRoute";
import LoginProtectedRoute from "./Component/LoginProtectRoute";
import UserTask from "./Pages/UserTask";
import Profile from "./Pages/Profile";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AuthProvider>
                <LoginProtectedRoute />
              </AuthProvider>
            }
          >
            <Route path="/" element={<Login />} />
          </Route>

          <Route
            element={
              <AuthProvider>
                <Layout />
              </AuthProvider>
            }
          >
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/task" element={<Task />} />
              <Route path="/UserTask" element={<UserTask />} />
              <Route path="/Profile" element={<Profile />} />
            </Route>
            {/* <Route path="/services" element={<Services />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
