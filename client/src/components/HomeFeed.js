import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { CurrentUserContext } from './CurrentUserContext';

import Spinner from './Spinner';
import TweetItem from './TweetItem';

const HomeFeed = () => {
  const [tweets, setTweets] = useState({});
  const [homeFeedStatus, setHomeFeedStatus] = useState('loading');
  const { renderHomeFeed } = useContext(CurrentUserContext);

  // Fetch the home feed
  useEffect(() => {
    fetch('http://localhost:31415/api/me/home-feed')
      .then((res) => res.json())
      .then((json) => {
        setTweets({...json});
        setHomeFeedStatus('idle');
      })
      .catch(() => {
        window.location.href = 'http://localhost:3000/error-page';
      });
  }, [renderHomeFeed]);

  return (
    <>
      {homeFeedStatus === 'loading' ?
        <Spinner />
      : 
        <>
          {tweets.tweetIds.map(id => <TweetItem
            key={uuidv4()}
            tweet={tweets.tweetsById[id]}
          />)}
        </>
      }
    </>
  );
}

export default HomeFeed;
