import { Navigate, Outlet } from "react-router-dom";
import { useAuthen } from "../Context/AuthContext";
// import { useAuth } from "./Authenticated";

type PrivateRouterProps = {
  role: string;
};

const PrivateRouter = ({ role }: PrivateRouterProps) => {
  const { user } = useAuthen(); // Lấy user từ AuthContext
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Hợp lệ
};
export default PrivateRouter;
