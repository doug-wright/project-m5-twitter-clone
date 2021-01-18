import React from 'react';
import { useParams } from "react-router-dom";

const TweetDetails = () => {
  const { tweetId } = useParams();

  return (
    <>
      Tweet Details {tweetId}
    </>
  );
}

export default TweetDetails;
