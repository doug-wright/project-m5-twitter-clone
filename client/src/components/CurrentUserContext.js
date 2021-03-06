import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [renderHomeFeed, setRenderHomeFeed] = useState(false);

  // Fetch the user profile
  useEffect(() => {
    fetch('http://localhost:31415/api/me/profile')
      .then((res) => res.json())
      .then((json) => {
        setCurrentUser(json.profile);
        setStatus('idle');
      })
      .catch(() => {
        setStatus('error');
        history.push({
          pathname: '/error-page',
          state: 'An error occured accessing your profile'
        });
      });
  }, [history]);

  return (
    <CurrentUserContext.Provider value={{currentUser, status, setStatus, renderHomeFeed, setRenderHomeFeed}}>
      {children}
    </CurrentUserContext.Provider>
  );
};
