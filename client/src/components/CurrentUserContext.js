import React, { createContext, useEffect } from 'react';

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  // Fetch the user data from the API (/me/profile)
  useEffect(() => {
    fetch('http://localhost:31415/api/me/profile')
      .then((res) => res.json())
      .then((json) => {
        setStatus('idle');
        setCurrentUser(json.profile.handle);
      })
      .catch(() => {
        window.location.href = 'http://localhost:3000/error-page';
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
