import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const BigMedia = ({ media }) => {
  return (
    <>
      {Object.values(media).map(value => 
        <div key={uuidv4}>
          {value.type === 'img' ? <Img src={value.url} /> : null}
          {/* add additional media types here */}
        </div>
      )}
    </>
  );
}

const Img = styled.img`
  width: 550px;
  border-radius: 20px;
`;

export default BigMedia;
