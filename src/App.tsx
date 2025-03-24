import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./components/LayoutAmin";
// import Authenticated from "./components/Authenticated";
import Dashboard from "./pages/Admin/Dashboard";
import ProductListPage from "./pages/Admin/products/list";
import ProductAdd from "./pages/Admin/products/create";
import ProductUpdate from "./pages/Admin/products/update";
import UserListPage from "./pages/Admin/users/list";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Client/HomePage";
import LayoutClient from "./components/LayoutClient";
import Login from "./pages/Client/Login";
import { AuthenProvider } from "./Context/AuthContext";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import PrivateRouter from "./components/PrivateRouter";
function App() {
  return (
    <>
      <AuthenProvider>
        <Routes>
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
          <Route
            path=""
            element={
              <LayoutClient>
                <Outlet />
              </LayoutClient>
            }
          >
            <Route index element={<HomePage />} />
            <Route element={<RedirectIfAuthenticated />}>
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </AuthenProvider>
      <Toaster />
    </>
  );
}

export default App;
