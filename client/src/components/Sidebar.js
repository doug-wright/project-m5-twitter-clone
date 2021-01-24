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
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 190px;
  /* border: 1px solid lightgray; */
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

  &:hover {
    color: ${COLORS.primary};
    background-color: ${COLORS.btnBackground};
  }

  &.active {
    color: ${COLORS.primary};
  }
`;

export default Sidebar;
