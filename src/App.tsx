import "./App.css";
import { Toaster } from "react-hot-toast";
import { AuthenProvider } from "./Context/AuthContext";
import AdminRouter from "./routers/AdminRouter";
import ClientRouter from "./routers/ClientRouter";
import ScrollToTop from "./components/Client/ScrollToTop";
import { Route, Routes } from "react-router-dom";
import { ModalProvider } from "./Context/ModalContext";
import { CartProvider } from "./Context/CartContext";
function App() {
  return (
    <>
      <AuthenProvider>
        <ScrollToTop />
        <ModalProvider>
          <CartProvider>
            <Routes>
              {AdminRouter()}
              {ClientRouter()}
              <Route path="*" element={<h1>404 not found</h1>} />;
            </Routes>
          </CartProvider>
        </ModalProvider>
      </AuthenProvider>
      <Toaster />
    </>
  );
}

export default App;
