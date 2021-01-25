import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";

import { COLORS } from '../constants';

const TweetActions = ({ id, isLiked, isRetweeted, numLikes, numRetweets }) => {
  const [likes, setLikes] = useState(numLikes);
  const [liked, setLiked] = useState(isLiked);
  
  const handleLikeClick = (event) => {
    const tweetId = event.currentTarget.attributes.id.value;
    let jsonBody = {};

    if (liked) {
      jsonBody = { like: false };
    } else {
      jsonBody = { like: true };
    }

    fetch('/api/tweet/' + tweetId + '/like', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonBody)
    })
      .then((res) => res.json())
      .then((json) => {
        if (liked) {
          setLiked(false);
          setLikes(likes - 1);
        } else {
          setLiked(true);
          setLikes(likes + 1);
        }
      })
      .catch(() => {
        // do something if error
      });
  }

  return (
    <Wrapper>
      <Action>
        <MessageCircleBtn>
          <FiMessageCircle />
        </MessageCircleBtn>
      </Action>
      <Action>
        <RepeatBtn>
          <FiRepeat />
        </RepeatBtn>
        <Count style={numRetweets === 0 ? { visibility: 'hidden'} : null}>{numRetweets}</Count>
      </Action>
      <Action>
        <HeartBtn id={id} onClick={handleLikeClick}>
          <HeartIcon liked={liked.toString()} />
        </HeartBtn>
        <Count style={likes === 0 ? { visibility: 'hidden'} : null}>{likes}</Count>
      </Action>
      <Action>
        <UploadBtn>
          <FiUpload />
        </UploadBtn>
      </Action>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  left: 50px;
  width: 500px;
  height: 50px;
  /* border: 1px solid red; */
`;

const Action = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const MessageCircleBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.messageCircleBtnBg};
  }
`;

const RepeatBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.repeatBtnBg};
  }
`;

const HeartBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.heartBtnBg};
  }
`;

const HeartIcon = styled(FiHeart)`
  color: ${props => (props.liked === 'true') ? 'red' : 'black'};
  fill: ${props => (props.liked === 'true') ? 'red' : null};
`;

const UploadBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.uploadBtnBg};
  }
`;

const Count = styled.div`
  margin-left: 5px;
  font-size: 0.9rem;
`;

export default TweetActions;
