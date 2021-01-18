import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import { COLORS } from '../constants';
import { ReactComponent as Logo } from "../assets/logo.svg";

const Sidebar = () => {
  return (
    <Wrapper>
      <Logo />
      <Menu>
        <LinkItem>
          <NavigationLink to="/" exact>Home</NavigationLink>
        </LinkItem>
        <LinkItem>
          <NavigationLink to="/abc" exact>Profile</NavigationLink>
        </LinkItem>
        <LinkItem>
          <NavigationLink to="/notifications" exact>Notifications</NavigationLink>
        </LinkItem>
        <LinkItem>
          <NavigationLink to="/bookmarks" exact>Bookmarks</NavigationLink>
        </LinkItem>
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-block;
  width: 200px;
  /* border: 1px solid lightgray; */
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigationLink = styled(NavLink)`
  /* default styles here */

  &.active {
    color: ${COLORS.primary};
  }
`;

const LinkItem = styled.div`
  height: 25px;

`;

export default Sidebar;
