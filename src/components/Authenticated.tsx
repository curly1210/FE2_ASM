import React from "react";

type Props = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

const Authenticated = ({ children, fallback }: Props) => {
  const isAuthenticated = true;
  return <>{isAuthenticated ? children : fallback}</>;
};
export default Authenticated;

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // const login = async (email, password) => {
//   //   const response = await fetch("http://localhost:5000/login", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ email, password }),
//   //   });

//   //   const data = await response.json();
//   //   if (response.ok) {
//   //     localStorage.setItem("user", JSON.stringify(data));
//   //     setUser(data);
//   //     return true;
//   //   } else {
//   //     return false;
//   //   }
//   // };

//   // const logout = () => {
//   //   localStorage.removeItem("user");
//   //   setUser(null);
//   // };

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
