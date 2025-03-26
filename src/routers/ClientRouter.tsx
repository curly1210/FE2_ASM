import { Outlet, Route } from "react-router-dom";
import LayoutClient from "../components/LayoutClient";
import HomePage from "../pages/Client/HomePage";
import RedirectIfAuthenticated from "../components/RedirectIfAuthenticated";
import Login from "../pages/Client/Login";
import RequireAuth from "../components/RequireAuth";
import CartPage from "../pages/Client/CartPage";

const ClientRouter = () => {
  return (
    <Route
      // path="/"
      element={
        <LayoutClient>
          <Outlet />
        </LayoutClient>
      }
    >
      <Route index path="/" element={<HomePage />} />
      <Route element={<RedirectIfAuthenticated />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="carts" element={<CartPage />} />
      </Route>
    </Route>
  );
};
export default ClientRouter;
