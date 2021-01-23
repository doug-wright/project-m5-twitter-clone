import React, { useEffect, useReducer, useState }from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

import { COLORS } from '../constants';

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:31415/api/' + profileId + '/profile')
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      })
      .catch(() => {
        console.log('an error occured');
      });
  }, [profileId]);

  if (user.hasOwnProperty('profile')) {
    return (
      <>
      <ProfileHeader>
        <BannerImg src={user.profile.bannerSrc} />
        <AvatarImg src={user.profile.avatarSrc} />
        <FollowingButton>Following</FollowingButton>
      </ProfileHeader>
      <ProfileDetails>

      </ProfileDetails>
      </>
    );
  } else {
    return (
      <>
        Sorry, but user {profileId} does not exist.
      </>
    );
  }
}

const Wrapper = styled.div`
  width: 550px;
`;

const BannerImg = styled.img`
  width: 550px;
`;

const ProfileHeader = styled.div`
  height: 250px;
`;

const ProfileDetails = styled.div`
  height: 200px;
  border: 1px solid red;
`;

const AvatarImg = styled.img`
  position: relative;
  bottom: 66px;
  left: 10px;
  width: 124px;
  height: 124px;
  border: 4px solid white;
  border-radius: 50%;
`;

const FollowingButton = styled.button`
  position: relative;
  left: 300px;
  bottom: 85px;
  width: 110px;
  height: 40px;
  border-radius: 20px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  background-color: ${COLORS.primary};
`;

export default Profile;
