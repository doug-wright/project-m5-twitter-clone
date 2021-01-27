import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components';
import moment from 'moment';

import Spinner from './Spinner';
import BigMedia from './BigMedia';
import TweetActions from './TweetActions';

const TweetDetails = () => {
  const history = useHistory();
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState({});
  const [tweetStatus, setTweetStatus] = useState('loading');

  useEffect(() => {
    fetch('http://localhost:31415/api/tweet/' + tweetId)
      .then((res) => res.json())
      .then((json) => {
        setTweet({...json.tweet});
        setTweetStatus('idle');
      })
      .catch(() => {
        history.push({
          pathname: '/error-page',
          state: 'An error occured accessing the requested meow'
        })
      });
  }, []);

  return (
    <>
      {tweetStatus === 'loading' ?
        <Spinner scale="1.5" />
      : 
        <>
          <Header>
            <AvatarImg src={tweet.author.avatarSrc} />
            <Details>
              <DisplayName>
                {tweet.author.displayName}
              </DisplayName>
              <Handle>@{tweet.author.handle}</Handle>
            </Details>
          </Header>
          <Status>{tweet.status}</Status>
          {(tweet.media.length > 0) ? <BigMedia media={tweet.media}/> : null}
          <TimeStamp>{moment(tweet.timestamp).format('H:mm A - MMM D YYYY')}</TimeStamp>
          <TweetActions
            id={tweet.id}
            isLiked={tweet.isLiked}
            isRetweeted={tweet.isRetweeted}
            numLikes={tweet.numLikes}
            numRetweets={tweet.numRetweets}
          />
        </>
      }
    </>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 550px;
  height: 55px;
  margin-bottom: 5px;
`;

const Details = styled.div`
  display: inline;
  width: 500px;
  /* font-size: 0.8rem; */
`;

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const DisplayName = styled.span`
  font-weight: bold;
`;

const Handle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
`;

const Status = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const TimeStamp = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 0.9rem;
`;

export default TweetDetails;
