import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedStatus = localStorage.getItem('status');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setStatus(storedStatus);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, status, setStatus }}>
      {children}
    </UserContext.Provider>
  );
};
