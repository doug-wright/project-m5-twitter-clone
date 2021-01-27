import React, { useEffect, useState }from 'react';
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { FiMapPin, FiCalendar } from "react-icons/fi";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { COLORS } from '../constants';
import TweetItem from './TweetItem';
import Spinner from './Spinner';

const Profile = () => {
  const history = useHistory();
  const { profileId } = useParams();
  const [user, setUser] = useState({});
  const [menuTab, setMenuTab] = useState('tweets');
  const [tweets, setTweets] = useState({});
  const [profileFeedStatus, setProfileFeedStatus] = useState('loading');

  useEffect(() => {
    // Get the profile of the user
    fetch('http://localhost:31415/api/' + profileId + '/profile')
      .then((res) => res.json())
      .then((json) => {
        if (json.hasOwnProperty('error')) {
          if (json.error === 'user-not-found') {
            history.push({
              pathname: 'error-page',
              state: 'The requested profile does not exist'
            });
          }
        } else {
          setUser(json);
          
          // Get the user's tweets
          fetch('http://localhost:31415/api/' + profileId + '/feed')
          .then((res) => res.json())
          .then((json) => {
            setTweets(json);
            setProfileFeedStatus('idle');
          })
          .catch(() => {
            history.push({
              pathname: '/error-page',
              state: 'An error occured accessing your profile feed'
            })
          });
        }
      })
      .catch(() => {
        history.push({
          pathname: '/error-page',
          state: 'An error occured accessing your profile'
        })
      });
  }, [profileId, history]);

  const handleButtonClick = (event) => {
    setMenuTab(event.target.id);
  }

  return (
    <>
      {profileFeedStatus === 'loading' ?
        <Spinner scale="1.5" />
      :
        <>
          <ProfileHeader>
            <BannerImg src={user.profile.bannerSrc} />
            <AvatarImg src={user.profile.avatarSrc} />
            <FollowingButton>Following</FollowingButton>
          </ProfileHeader>
          <ProfileDetails>
            <DisplayName>{user.profile.displayName}</DisplayName>
            <br />@{user.profile.handle}
            {user.profile.isFollowingYou ?
              <FollowsYou>Follows you</FollowsYou>
            :
              null
            }
            <p><StyleBold>{user.profile.bio}</StyleBold></p>
            <LocationJoined>
              {user.profile.hasOwnProperty('location') ?
                <><MapPinIcon />{user.profile.location}&nbsp;&nbsp;</>
              :
                null
              }
              <CalendarIcon />Joined {moment(user.profile.joined).format('MMMM YYYY')}
            </LocationJoined>
            <p>
              <StyleBold>{user.profile.numFollowing}</StyleBold> Following&nbsp;&nbsp;&nbsp;
              <StyleBold>{user.profile.numFollowers}</StyleBold> Followers
            </p>
          </ProfileDetails>
          <NavBar>
            <MenuTab id="tweets" onClick={handleButtonClick} className={menuTab === 'tweets' ? 'selected' : 'notSelected'}>
              Tweets
            </MenuTab>
            <MenuTab id="media" onClick={handleButtonClick} className={menuTab === 'media' ? 'selected' : 'notSelected'}>
              Media
            </MenuTab>
            <MenuTab id="likes" onClick={handleButtonClick} className={menuTab === 'likes' ? 'selected' : 'notSelected'}>
              Likes
            </MenuTab>
          </NavBar>
          {(() => {
            if (menuTab === 'tweets') {
              return (
                <>
                {profileFeedStatus === 'loading' ?
                  <Spinner scale="1.5" />
                : 
                  <>
                    {tweets.tweetIds.map(id => <TweetItem
                      key={uuidv4()}
                      tweet={tweets.tweetsById[id]}
                    />)}
                  </>
                }
              </>
              );
              }

            if (menuTab === 'media') {
              return 'Render media';
            }

            if (menuTab === 'likes') {
              return 'Render likes';
            }
          })()}
      </>
    }
    </>
  );
}

const ProfileHeader = styled.div`
  height: 260px;
`;

const BannerImg = styled.img`
  width: 550px;
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

const ProfileDetails = styled.div`
  font-size: 0.8rem;
  padding-left: 15px;
`;

const DisplayName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const FollowsYou = styled.span`
  color: black;
  background-color: #eeeeee;
  border-radius: 3px;
  padding: 1px 4px;
  margin-left: 5px;
`;

const StyleBold = styled.span`
  font-weight: bold;
`;

const LocationJoined = styled.div`
  display: flex;
  align-items: center;
`;

const MapPinIcon = styled(FiMapPin)`
  margin-right: 7px;
`;

const CalendarIcon = styled(FiCalendar)`
  margin-right: 7px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MenuTab = styled.button`
  flex-grow: 1;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  border: none;
  border-bottom: 2px solid white;
  background-color: white;
  outline: none;
  cursor: pointer;

  &:hover, :focus {
    color: ${COLORS.primary};
    background-color: ${COLORS.btnBackground};
  }

  &.selected {
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
  }
`;

export default Profile;
