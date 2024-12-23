import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";

export function getToken(){
let token = Cookies.get("token");
return token??false;
}

export async function logout(){
const token = Cookies.get(token);
if(token){
    Cookies.remove("token");
}
}
