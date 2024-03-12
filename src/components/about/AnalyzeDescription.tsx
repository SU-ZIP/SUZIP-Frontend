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

const BoldText = styled.div`
  display: inline-block;
  font-family: "Pretendard";
  font-size: 1.7rem;
  font-weight: 700;
  white-space: nowrap;
`;

const HighlightText = styled.div`
  display: inline-block;
  font-family: "Pretendard";
  font-size: 1.8rem;
  font-weight: 400;
  white-space: nowrap;
  line-height: 1.2;
  margin-right: 0.5rem;
  padding: 0 0.5vw 0 0.5vw;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
`;

function AnalyzeDescription() {
  return (
    <DescriptionContainer>
      <DecorationText>Analyze</DecorationText>
      <MainMessage>
        <TextBox>
          수집은 일기를 통해 감정을 <BoldText>분석</BoldText>
          하고
        </TextBox>
        <TextBox>
          <BoldText>뭐시기 뭐시기</BoldText> 해줍니다 안녕하세요 이건 이거예요
        </TextBox>
      </MainMessage>

      <MainMessage>
        <TextBox>감정은 로버트 플루칙의 감정 심리 진화론에 따라</TextBox>
        <TextBox>
          <HighlightText>분노 기대 기쁨 신뢰 공포 놀람 슬픔 혐오</HighlightText>{" "}
          등의 감정이 나타납니다
        </TextBox>
      </MainMessage>
    </DescriptionContainer>
  );
}

export default AnalyzeDescription;
