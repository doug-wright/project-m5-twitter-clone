import React, { createContext, useState, useEffect } from 'react';

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  // Fetch the user data from the API (/me/profile)
  useEffect(() => {
    fetch('http://localhost:31415/api/me/profile')
      .then((res) => res.json())
      .then((json) => {
        setCurrentUser(json.profile);
        setStatus('idle');
      })
      .catch(() => {
        window.location.href = 'http://localhost:3000/error-page';
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{currentUser, status, setStatus}}>
      {children}
    </CurrentUserContext.Provider>
  );
};
