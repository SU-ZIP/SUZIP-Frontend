import React from "react";
import styled from "styled-components";

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5vw;
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
          수집은 일기를 통해 감정을 <BoldText>분석</BoldText>
          하고
        </TextBox>
        <TextBox>
          <BoldText>뭐시기 뭐시기</BoldText>해줍니다 안녕하세요 이건 이거예요
        </TextBox>
      </MainMessage>
    </DescriptionContainer>
  );
}

export default CalendarDescription;
