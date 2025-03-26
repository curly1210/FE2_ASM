import { Navigate, Outlet } from "react-router-dom";
import { useAuthen } from "../Context/AuthContext";

const RequireAuth = () => {
  const { user } = useAuthen();

  return user ? <Outlet /> : <Navigate to={"/"} />;
};
export default RequireAuth;
