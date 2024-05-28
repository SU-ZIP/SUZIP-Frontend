import React from "react";
import styled from "styled-components";

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15vh 0 0 0;
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

const DecorationText = styled.div`
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  letter-spacing: 0.2rem;
`;

const SmallText = styled.div`
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: 300;
  white-space: nowrap;
  text-align: center;
`;

const BoldText = styled.div`
  display: inline-block;
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-weight: 700;
  white-space: nowrap;
`;

function CalendarDescription() {
  return (
    <DescriptionContainer>
      <DecorationText>Calendar</DecorationText>
      <MainMessage>
        <TextBox>
          캘린더에 표시된 <BoldText>컬러칩</BoldText>을 통해
        </TextBox>
        <TextBox>
          한 달간의 <BoldText>내 감정을 한 눈에</BoldText> 볼 수 있습니다
        </TextBox>
      </MainMessage>
    </DescriptionContainer>
  );
}

export default CalendarDescription;
