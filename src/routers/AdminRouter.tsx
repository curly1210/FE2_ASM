import { Navigate, Outlet, Route } from "react-router-dom";
import PrivateRouter from "../components/PrivateRouter";
import LayoutAdmin from "../components/LayoutAmin";
// import Dashboard from "../pages/Admin/Dashboard";
import ProductListPage from "../pages/Admin/products/list";
import ProductAdd from "../pages/Admin/products/create";
import ProductUpdate from "../pages/Admin/products/update";
import UserListPage from "../pages/Admin/users/list";
import ListOrder from "../pages/Admin/orders/list";
import Statistical from "../pages/Admin/statistical/Statistical";
import ChartMoth from "../pages/Admin/statistical/ChartMoth";

const AdminRouter = () => {
  return (
    // <Routes>
    <Route element={<PrivateRouter role="admin" />}>
      <Route
        path="admin"
        element={
          // <Authenticated fallback={<Navigate to="/login" replace />}>
          <LayoutAdmin>
            <Outlet />
          </LayoutAdmin>
          // </Authenticated>
        }
      >
        <Route index element={<Navigate to="products" replace />} />
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="products">
          <Route index element={<ProductListPage />} />
          <Route path="create" element={<ProductAdd />} />
          <Route path="update/:id" element={<ProductUpdate />} />
        </Route>

        <Route path="users">
          <Route index element={<UserListPage />} />
        </Route>

        <Route path="orders">
          <Route index element={<ListOrder />} />
        </Route>

        <Route path="statistical" element={<Statistical />} />
        <Route path="testchart" element={<ChartMoth />} />
      </Route>
    </Route>
    // </Routes>
  );
};
export default AdminRouter;
