import React from 'react';
import TweetItem from './TweetItem';
import styled from 'styled-components';
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";

import { COLORS } from '../constants';

const TweetActions = () => {
  return (
    <Wrapper>
      <MessageCircleBtn>
        <FiMessageCircle />
      </MessageCircleBtn>
      <RepeatBtn>
        <FiRepeat id="repeatBtn" />
      </RepeatBtn>
      <HeartBtn>
        <FiHeart id="heartBtn" />
      </HeartBtn>
      <UploadBtn>
        <FiUpload id="uploadBtn" />
      </UploadBtn>
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

export default TweetActions;
