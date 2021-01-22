import React, { useContext } from 'react';
import styled from 'styled-components';

import { CurrentUserContext } from './CurrentUserContext';
import { COLORS } from '../constants';

const PostTweet = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <AvatarArea>
        <AvatarImg src={currentUser.avatarSrc} />
      </AvatarArea>
      <InputArea>
        <TextArea placeholder="What's Happening?" rows="6" cols="50" maxLength="290" />
      </InputArea>
      <ButtonArea>
        <Button>Meow</Button>
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
  /* border: 1px solid lightgray; */
  border-bottom: 7px solid #eeeeee;
`;

const AvatarArea = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 1;
  margin-top: 5px;
  /* border: 1px solid lightgray; */
`;

const InputArea = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  /* display: flex; */
  /* flex-direction: column-reverse; */
  grid-column-start: 2;
  /* border: 1px solid lightgray; */
`;

const ButtonArea = styled.div`
  display: flex;
  justify-self: right;
  align-items: center;
  margin-right: 10px;
  grid-column-start: 2;
  grid-row-start: 2;
  /* border: 1px solid lightgray; */
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
  background-color: ${COLORS.primary};
  cursor: pointer;
`;

const TextArea = styled.textarea`
  /* width: 500px; */
  /* height: 125px; */
  font-size: 1.2rem;
  font-weight: bold;
  resize: none;
  overflow: hidden;
  border: none;
  outline: none;
`;

export default PostTweet;
