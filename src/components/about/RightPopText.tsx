import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

function RightPopText() {
  return (
    <MainMessage>
      <TextBox>aaaaaaa</TextBox>
      <BoldText>bbbbb</BoldText>
      <TextBox>ccccc</TextBox>
    </MainMessage>
  );
}

export default RightPopText;
