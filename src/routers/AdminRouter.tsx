import { Outlet, Route } from "react-router-dom";
import PrivateRouter from "../components/PrivateRouter";
import LayoutAdmin from "../components/LayoutAmin";
import Dashboard from "../pages/Admin/Dashboard";
import ProductListPage from "../pages/Admin/products/list";
import ProductAdd from "../pages/Admin/products/create";
import ProductUpdate from "../pages/Admin/products/update";
import UserListPage from "../pages/Admin/users/list";

const AdminRouter = () => {
  return (
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
        <Route index element={<Dashboard />} />
        <Route path="products">
          <Route index element={<ProductListPage />} />
          <Route path="create" element={<ProductAdd />} />
          <Route path="update/:id" element={<ProductUpdate />} />
        </Route>

        <Route path="users">
          <Route index element={<UserListPage />} />
        </Route>
      </Route>
    </Route>
  );
};
export default AdminRouter;
