import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Media = ({ media }) => {
  return (
    <>
      {Object.values(media).map(value => {
        if (value.type === 'img') {
          return (<Img key={uuidv4} src={value.url} />);
        }
        // Put additional conditions for other
        // types of media
      })}
    </>
  );
}

const Img = styled.img`
  width: 500px;
  position: relative;
  left: 50px;
  border-radius: 25px;
`;

export default Media;
