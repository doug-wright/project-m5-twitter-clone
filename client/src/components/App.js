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
import Spinner from './Spinner';
import PostTweet from './PostTweet';

import { CurrentUserContext } from './CurrentUserContext';

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  if (status !== 'error') {
  return (
    <Wrapper>
      <Sidebar />
      <Main>
        {status === 'loading' ?
          <Spinner scale="1.5" />
        :
          <Switch>
            <Route exact path="/error-page">
              <ErrorPage />
            </Route>
            <Route exact path="/">
              <PageTitle>Home</PageTitle>
              <PostTweet />
              <HomeFeed />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/bookmarks">
              <BookMarks />
            </Route>
            <Route path="/:profileId">
              <Profile />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
          </Switch>
        }
      </Main>
    </Wrapper>
  )
      } else {
        return (
          <Wrapper>
            <Sidebar />
            <Main>
              <Route exact path="/error-page">
                <ErrorPage />
              </Route>
            </Main>
          </Wrapper>
        );
      }
}

const Wrapper = styled.div`
  display: flex;
`;

const Main = styled.div`
  width: 550px;
  /* flex: 1 0 auto; */
  /* border: 1px solid red; */
`;

const PageTitle = styled.div`
  padding: 10px;
  font-weight: bold;
`;

export default App;
