import { createContext, useState, useRef, useEffect } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [subUser, setSubUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    const items1 = JSON.parse(localStorage.getItem("admin"));
    const items2 = JSON.parse(localStorage.getItem("subUser"));
    if (items || items1 || items2) {
      setAdmin(items1);
      setSubUser(items2);
      setUser(items);
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        admin,
        setAdmin,
        setUser,
        subUser,
        setSubUser,
        user,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
