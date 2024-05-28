import React from "react";
import styled from "styled-components";

const MainMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 우측 정렬 */
  margin: 2vh 0;
`;

const TextBox = styled.div`
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-weight: 400;
  white-space: nowrap;
  line-height: 1.2;
  text-align: right; /* 텍스트 우측 정렬 */
  width: 100%;
`;

const BoldText = styled.div`
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-weight: 700;
  white-space: nowrap;
  text-align: right; /* 텍스트 우측 정렬 */
  width: 100%;
`;

function RightPopText() {
  return (
    <MainMessage>
      <TextBox>수집과 함께</TextBox>
      <BoldText>다채롭게 물드는</BoldText>
      <TextBox>우리의 매일</TextBox>
    </MainMessage>
  );
}

export default RightPopText;
