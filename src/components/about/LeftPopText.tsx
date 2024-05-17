import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// keyframes 정의
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 애니메이션 클래스를 styled-components로 정의
const AnimatedDiv = styled.div`
  &.slide-in-left {
    animation: ${slideInFromLeft} 0.5s ease-out forwards;
  }
`;

const MainMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vh 0 2vh 0;
`;

const TextBox = styled.div`
  display: inline-block;
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-weight: 400;
  white-space: nowrap;
  line-height: 1.2;
  margin-right: 0.5rem;
`;

const BoldText = styled.div`
  display: inline-block;
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-weight: 700;
  white-space: nowrap;
`;

function LeftPopText() {
  return (
    <MainMessage>
      <TextBox>aaaaaaa</TextBox>
      <BoldText>bbbbb</BoldText>
      <TextBox>ccccc</TextBox>
    </MainMessage>
  );
}

export default LeftPopText;
