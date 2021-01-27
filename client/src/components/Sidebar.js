import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { FiHome, FiUser, FiBell,FiBookmark } from "react-icons/fi";
import { COLORS } from '../constants';
import { ReactComponent as Logo } from "../assets/logo.svg";

import { CurrentUserContext } from './CurrentUserContext';

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <Logo style={{ width: 50 + 'px' }}/>
      <Nav>
        <LinkContainer>
          <NavigationLink to="/" exact>
            <Icon><FiHome /></Icon>
            Home
          </NavigationLink>
        </LinkContainer>
        <LinkContainer>
          <NavigationLink to={currentUser === null ? "/" : "/" +  currentUser.handle}>
            <Icon><FiUser /></Icon>
            Profile
          </NavigationLink>
        </LinkContainer>
        <LinkContainer>
          <NavigationLink to="/notifications">
            <Icon>
              <FiBell />
            </Icon>
            Notifications
          </NavigationLink>
        </LinkContainer>
        <LinkContainer>
          <NavigationLink to="/bookmarks">
            <Icon>
              <FiBookmark />
            </Icon>
            Bookmarks
          </NavigationLink>
        </LinkContainer>
        <MeowBtnContainer>
          <MeowButton>
            Meow
          </MeowButton>
        </MeowBtnContainer>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.div`

`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkContainer = styled.span`
  margin: 10px 10px 10px 5px;
`;

const Icon = styled.div`
  display: inline;
  margin-right: 20px;
`;

const NavigationLink = styled(NavLink)`
  font-weight: bold;
  padding: 10px;
  border-radius: 25px;

  &:hover, :focus {
    color: ${COLORS.primary};
    background-color: ${COLORS.btnBackground};
  }

  &.active {
    color: ${COLORS.primary};
  }
`;

const MeowBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const MeowButton = styled.button`
  width: 140px;
  height: 30px;
  border-radius: 15px;
  border: none;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export default Sidebar;
