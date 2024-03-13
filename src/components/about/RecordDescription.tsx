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

function RecordDescription() {
  return (
    <DescriptionContainer>
      <DecorationText>Record</DecorationText>
      <MainMessage>
        <TextBox>
          오늘 하루는 <BoldText>어떤 색</BoldText>
          이었나요?
        </TextBox>
        <TextBox>
          <BoldText>수집</BoldText>과 함께 당신의 마음을 들여다보세요
        </TextBox>
      </MainMessage>
      <SmallText>
        수집은 사용자의 일기를 바탕으로 하루동안의 마음을 색으로 표현합니다
      </SmallText>
      <SmallText>
        미처 알아차리지 못했던 마음들을 돌아보고, 나만의 컬러풀한 매일을
        기록하세요
      </SmallText>
    </DescriptionContainer>
  );
}

export default RecordDescription;
