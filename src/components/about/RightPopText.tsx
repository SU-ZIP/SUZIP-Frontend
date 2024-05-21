import React from "react";
import styled from "styled-components";

const MainMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end; /* 우측 정렬 */
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
  text-align: right; /* 텍스트 우측 정렬 */
`;

const BoldText = styled.div`
  display: inline-block;
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-weight: 700;
  white-space: nowrap;
  text-align: right; /* 텍스트 우측 정렬 */
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
