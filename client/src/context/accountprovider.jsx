import { createContext, useState, useRef, useEffect } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [subUser, setSubUser] = useState(null);
  const [user, setUser] = useState(null);
  console.log(user, admin);

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
