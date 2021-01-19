import React, { useContext }from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import styled from 'styled-components';

import Sidebar from './Sidebar';
import BookMarks from './Bookmarks';
import HomeFeed from './HomeFeed';
import Notifications from './Notifications';
import Profile from './Profile';
import TweetDetails from './TweetDetails';
import ErrorPage from './ErrorPage';

import { CurrentUserContext } from './CurrentUserContext';

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  return (
    <>
      <Sidebar />
      <Main>
        {status === 'loading' ? 'Getting current user...' :
        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route exact path="/error-page">
            <ErrorPage />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/bookmarks">
            <BookMarks />
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route exact path="/:profileId">
            <Profile />
          </Route>
        </Switch>}
      </Main>
    </>
  )
}

const Main = styled.div`
  display: inline-block;
  position: absolute;
  /* border: 1px solid lightgray; */
`;

export default App;
