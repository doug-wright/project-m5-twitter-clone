import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FiLoader } from "react-icons/fi";

const Spinner = ({ scale }) => {
  return (
    <Wrapper>
      <Spin scale={scale} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const animation = (scale) => keyframes`
  from {
    transform: rotate(0deg) scale(${scale});
  }

  to {
    transform: rotate(360deg) scale(${scale});
  }
`;

const Spin = styled(FiLoader)`
  animation: ${props => animation(props.scale)} 1.5s linear infinite;
`;

export default Spinner;
