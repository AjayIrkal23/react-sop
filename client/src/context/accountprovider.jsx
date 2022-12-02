import { createContext, useState, useRef, useEffect } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AccountContext.Provider
      value={{
        admin,
        setAdmin,
        setUser,
        user,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
