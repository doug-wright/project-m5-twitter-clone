import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { CurrentUserContext } from './CurrentUserContext';
import { COLORS } from '../constants';
import Spinner from './Spinner';

const PostTweet = () => {
  const { currentUser, renderHomeFeed, setRenderHomeFeed } = useContext(CurrentUserContext);
  const [value, setValue] = useState('');
  const [postTweetStatus, setPostTweetStatus] = useState('idle');
  
  const inputRemaining = 280 - value.length;
  let btnDisabled = false;

  const handleInput = (event) => {
    setValue(event.target.value);
  }

  const handleClick = () => {
    btnDisabled = true;
    setPostTweetStatus('loading');
    fetch('http://localhost:3000/api/tweet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: value })
    })
      .then((res) => res.json())
      .then((json) => {
        setPostTweetStatus('idle');
        if (renderHomeFeed) {
          setRenderHomeFeed(false);
        } else {
          setRenderHomeFeed(true);
        }
        
        setValue('');
      })
      .catch(() => {
        setPostTweetStatus('idle');
        // history.push({
        //   pathname: '/error-page',
        //   state: 'Component: index, Cannot contact server'
        // });
      });

  }

  if (inputRemaining < 0 || inputRemaining === 280) {
    btnDisabled = true;
  }

  return (
    <Wrapper>
      <AvatarArea>
        <AvatarImg src={currentUser.avatarSrc} />
      </AvatarArea>
      <InputArea>
        <TextArea
          onChange={handleInput}
          placeholder="What's happening?"
          value={value}
          rows="6"
          cols="50"
          maxLength="290"
        />
      </InputArea>
      <ButtonArea>
        <Counter inputRemaining={inputRemaining}>{inputRemaining}</Counter>
        <Button onClick={handleClick} disabled={btnDisabled} state={btnDisabled}>
          {postTweetStatus === 'loading' ? 'Posting' : 'Meow'}
        </Button>
      </ButtonArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 500px;
  grid-template-rows: 140px 60px;
  width: 550px;
  height: 200px;
  border-bottom: 7px solid #eeeeee;
`;

const AvatarArea = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 1;
  margin-top: 5px;
`;

const InputArea = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  grid-column-start: 2;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-self: right;
  align-items: center;
  margin-right: 10px;
  grid-column-start: 2;
  grid-row-start: 2;
`;

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  border: none;
  color: white;
  font-weight: bold;
  background-color: ${props => props.state ? COLORS.btnBackground : COLORS.primary};
  cursor: pointer;
`;

const Counter = styled.span`

  color: ${props => {
    if (props.inputRemaining < 0) {
      return 'red';
    } else if (props.inputRemaining < 56) {
      return 'orange';
    } else {
      return 'darkgray';
    }
  }};

  font-size: 0.8rem;
  margin-right: 20px;
`;

const TextArea = styled.textarea`
  font-size: 1.2rem;
  font-weight: bold;
  resize: none;
  overflow: hidden;
  border: none;
  outline: none;
`;

export default PostTweet;
