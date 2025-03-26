import "./App.css";
import { Toaster } from "react-hot-toast";
import { AuthenProvider } from "./Context/AuthContext";
import AdminRouter from "./routers/AdminRouter";
import ClientRouter from "./routers/ClientRouter";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <AuthenProvider>
        <Routes>
          {AdminRouter()}
          {ClientRouter()}
          <Route path="*" element={<h1>404 not found</h1>} />;
        </Routes>
      </AuthenProvider>
      <Toaster />
    </>
  );
}

export default App;
