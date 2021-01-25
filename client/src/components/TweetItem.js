import React from 'react';
import styled from 'styled-components';
import { FiRepeat } from "react-icons/fi";
import moment from 'moment';

import Media from './Media';
import TweetActions from './TweetActions';

const TweetItem = ({ tweet }) => {
  return (
    <Wrapper>
      {(tweet.hasOwnProperty('retweetFrom')) ? 
        <RetweetFrom>
          <RepeatIcon />
            {tweet.retweetFrom.displayName} Remeowed
          </RetweetFrom>
      :
        null
      }
      <TweetHeader>
        <AvatarImg src={tweet.author.avatarSrc} />
        <Details>
          <DisplayName>{tweet.author.displayName}</DisplayName>
          &nbsp;@{tweet.author.handle} - {moment(tweet.timestamp).format('MMM Do')}
          <p>{tweet.status}</p>
        </Details>
      </TweetHeader>
      {(tweet.media.length > 0) ? <Media media={tweet.media}/> : null}
      <ActionContainer>
      <TweetActions
        id={tweet.id}
        isLiked={tweet.isLiked}
        isRetweeted={tweet.isRetweeted}
        numLikes={tweet.numLikes}
        numRetweets={tweet.numRetweets}
      />
      </ActionContainer>
      <Separator />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 10px;
`;

const Separator = styled.div`
  position: relative;
  left: 50px;
  width: 500px;
  height: 1px;
  border: 1px solid #eeeeee;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const RetweetFrom = styled.div`
  color: darkgray;
  font-size: 0.8rem;
  margin: 5px 0 5px 30px;
`;

const RepeatIcon = styled(FiRepeat)`
  margin-right: 5px;
`;

const TweetHeader = styled.div`
  display: flex;
  width: 550px;
  margin-bottom: 5px;
`;

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Details = styled.div`
  display: inline;
  width: 500px;
  font-size: 0.8rem;
`;

const DisplayName = styled.span`
  font-weight: bold;
`;

const ActionContainer = styled.div`
  width: 500px;
  position: relative;
  left: 50px;
`;

export default TweetItem;
