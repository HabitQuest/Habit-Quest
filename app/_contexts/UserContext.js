"use client";
import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userCookie = getCookie("user");
      console.log("Retrieved user cookie:", userCookie);
      if (userCookie) {
        try {
          setUser(JSON.parse(userCookie));
        } catch (error) {
          console.error("Error parsing the user cookie:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

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
