"use client";
import React, { useState, useContext, useEffect } from "react";
import { setCookie, getCookie, eraseCookie } from "../utils/cookies";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getCookie("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCookie("user", JSON.stringify(user), 3);
    } else {
      eraseCookie("user");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
