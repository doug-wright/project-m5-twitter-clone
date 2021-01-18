import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';

import GlobalStyles from "./GlobalStyles";
import Sidebar from './Sidebar';
import BookMarks from './Bookmarks';
import HomeFeed from './HomeFeed';
import Notifications from './Notifications';
import Profile from './Profile';
import TweetDetails from './TweetDetails';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Sidebar />
        <Main>
        <Switch>
          <Route exact path="/">
            <HomeFeed />
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
        </Switch>
        </Main>
      </Router>
    </>
  )
}

const Main = styled.div`
  display: inline-block;
  position: absolute;
  /* border: 1px solid lightgray; */
`;

export default App;
