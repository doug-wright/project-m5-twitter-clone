import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import { u1F4A3 as bomb } from 'react-icons-kit/noto_emoji_regular/u1F4A3';
import { COLORS } from '../constants';

const ErrorPage = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <Content>
      <Icon size={60} icon={bomb} />
        <ErrorTitle>
          {location.hasOwnProperty('state') ?
            location.state
          :
            'An unknown error has occured.'
          }
        </ErrorTitle>
        <p>
          Please try refresing the page,
          or <EmailLink>contact support</EmailLink> if
          the problem persists.
        </p>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 100px;
`;

const ErrorTitle = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
`;

const EmailLink = styled.span`
  color: ${COLORS.primary};
  text-decoration: underline;
`;

export default ErrorPage;
