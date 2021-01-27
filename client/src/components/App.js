import React, { useContext }from 'react';
import { Switch, Route } from "react-router-dom";
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
  const { status } = useContext(CurrentUserContext);

  // Only render the routes if the user profile was
  // fetched successfully.
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
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks">
              <BookMarks />
            </Route>
            <Route exact path="/:profileId">
              <Profile />
            </Route>
            <Route exact path="/tweet/:tweetId">
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
  display: grid;
  grid-template-columns: 180px 550px;
`;

const Main = styled.div`

`;

const PageTitle = styled.div`
  padding: 10px;
  font-weight: bold;
`;

export default App;
