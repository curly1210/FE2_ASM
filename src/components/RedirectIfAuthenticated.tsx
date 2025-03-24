import { Navigate, Outlet } from "react-router-dom";
import { useAuthen } from "../Context/AuthContext";
// import { useAuth } from "./Authenticated";

const RedirectIfAuthenticated = () => {
  const { user } = useAuthen(); // Lấy user từ AuthContext
  // console.log(user);
  return user ? <Navigate to="/" replace /> : <Outlet />;
};
export default RedirectIfAuthenticated;
