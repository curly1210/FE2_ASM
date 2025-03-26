/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import { useAuthen } from "../Context/AuthContext";

const RedirectIfAuthenticated = () => {
  const { user } = useAuthen(); // Lấy user từ AuthContext
  // console.log(user);
  return user ? <Navigate to="/" replace /> : <Outlet />;

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) navigate("/", { replace: true });
  // }, [user]);
  // return <Outlet />;
};
export default RedirectIfAuthenticated;
