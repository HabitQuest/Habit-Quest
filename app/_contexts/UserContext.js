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

      if (userCookie) {
        try {
          const parsedUser = JSON.parse(userCookie);
          // Fetch fresh user data from the API
          const response = await fetch(`/api/users/${parsedUser.id}`);
          if (response.ok) {
            const freshUserData = await response.json();
            setUser(freshUserData);
            // Update cookie with fresh data
            document.cookie = `user=${JSON.stringify(freshUserData)}; path=/`;
          } else {
            setUser(parsedUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
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
