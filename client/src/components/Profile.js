import React from 'react';
import { useParams } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();

  return (
    <>
      Profile {profileId}
    </>
  );
}

export default Profile;
