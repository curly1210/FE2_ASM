import { Outlet, Route, Routes } from "react-router-dom";
import LayoutClient from "../components/LayoutClient";
import HomePage from "../pages/Client/HomePage";
import RedirectIfAuthenticated from "../components/RedirectIfAuthenticated";
import Login from "../pages/Client/Login";
import RequireAuth from "../components/RequireAuth";
import CartPage from "../pages/Client/CartPage";
import { ModalProvider } from "../Context/ModalContext";
import Checkout from "../pages/Client/Checkout";
import OrderSuccess from "../pages/Client/OrderSuccess";
import Register from "../pages/Client/Register";
import DetailPage from "../pages/Client/DetailPage";

const ClientRouter = () => {
  return (
    <ModalProvider>
      <Routes>
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
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="carts" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success" element={<OrderSuccess />} />
          </Route>
          <Route path="detail-product/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </ModalProvider>
  );
};
export default ClientRouter;
