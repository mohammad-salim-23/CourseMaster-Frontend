"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as logoutService } from "@/src/services/AuthService";

interface User {
  name?: string;
  email?: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  reloadUser: () => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const reloadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  useEffect(() => {
    reloadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, reloadUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
