import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";

import { COLORS } from '../constants';

const TweetActions = ({ id, isLiked, isRetweeted, numLikes, numRetweets}) => {
  const history = useHistory();
  const [likes, setLikes] = useState(numLikes);
  const [liked, setLiked] = useState(isLiked);
  const messageCircleBtnRef = useRef(null);
  const repeatBtnRef = useRef(null);
  const heartBtnRef = useRef(null);
  const uploadBtnRef = useRef(null);

  const handleMessageCircleClick = () => {
    messageCircleBtnRef.current.blur();
  }

  const handleRepeatClick = () => {
    repeatBtnRef.current.blur();
  }
  
  const handleHeartClick = (event) => {
    const tweetId = event.currentTarget.attributes.id.value;
    let jsonBody = {};

    heartBtnRef.current.blur();

    if (liked) {
      jsonBody = { like: false };
    } else {
      jsonBody = { like: true };
    }

    // Send like/unlink to server
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
        history.push({
          pathname: '/error-page',
          state: 'An error occured liking or unliking a meow'
        })
      });
  }

  const handleUploadClick = () => {
    uploadBtnRef.current.blur();
  }

  return (
    <Wrapper>
      <Action>
        <MessageCircleBtn ref={messageCircleBtnRef} onClick={handleMessageCircleClick}>
          <FiMessageCircle />
        </MessageCircleBtn>
      </Action>
      <Action>
        <RepeatBtn ref={repeatBtnRef} onClick={handleRepeatClick}>
          <FiRepeat />
        </RepeatBtn>
        <Count style={numRetweets === 0 ? { visibility: 'hidden'} : null}>{numRetweets}</Count>
      </Action>
      <Action>
        <HeartBtn ref={heartBtnRef} id={id} onClick={handleHeartClick}>
          <HeartIcon liked={liked.toString()} />
        </HeartBtn>
        <Count style={likes === 0 ? { visibility: 'hidden'} : null}>{likes}</Count>
      </Action>
      <Action>
        <UploadBtn ref={uploadBtnRef} onClick={handleUploadClick}>
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
  height: 50px;
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

  &:hover, :focus {
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

  &:hover, :focus {
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

  &:hover, :focus {
    background-color: ${COLORS.heartBtnBg};
  }
`;

const HeartIcon = styled(FiHeart)`
  color: ${props => (props.liked === 'true') ? COLORS.heartLiked : 'black'};
  fill: ${props => (props.liked === 'true') ? COLORS.heartLiked : null};
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

  &:hover, :focus {
    background-color: ${COLORS.uploadBtnBg};
  }
`;

const Count = styled.div`
  margin-left: 5px;
  font-size: 0.9rem;
`;

export default TweetActions;
