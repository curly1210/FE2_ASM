/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useEffect, useState } from "react";

type AuthenProviderProps = {
  children: React.ReactNode;
};

type IUser = {
  accessToken: string;
  user: {
    email: string;
    fullname: string;
    id: number;
    phone: string;
    role: string;
    sex: string;
  };
};

type AuthenContextType = {
  user: IUser | null;
  setUser: (
    IUser: {
      accessToken: string;
      user: {
        email: string;
        fullname: string;
        id: number;
        phone: string;
        role: string;
        sex: string;
      };
    } | null
  ) => void;
};

export const AuthenContext = createContext<AuthenContextType>({
  user: null,
  setUser: () => {},
});

export const AuthenProvider = ({ children }: AuthenProviderProps) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const storeUser = localStorage.getItem("user");
    return storeUser ? (JSON.parse(storeUser) as IUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthenContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuthen = (): AuthenContextType => {
  return useContext(AuthenContext);
};
