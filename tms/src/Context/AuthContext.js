import { Children, createContext , useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import {getToken , logout} from '../api/userAuth'
export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
   const token = getToken();
   const [currentUser  , setCurrentUser] = useState(token);
   const navigate = useNavigate();

   useEffect(()=>{
    let token = Cookies.get('token')??false;
    setCurrentUser(token ? true : false);
   },[]);
   useEffect(()=>{
    setCurrentUser(token ? true : false);
   }, [token , currentUser]);

   const handleLogout = async ()=>{
    logout();
   }

   return (
  <AuthContext.Provider value = {{currentUser , setCurrentUser , handleLogout}}>
{children}
  </AuthContext.Provider>
   )
}


