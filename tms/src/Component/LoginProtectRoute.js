import React from "react";
import { Navigate,Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";


const LoginProtectedRoute = ()=>{
    const {currentUser} = useAuth();
    return currentUser? <Navigate to="/dashboard" />:<Outlet/>
}
export default LoginProtectedRoute;