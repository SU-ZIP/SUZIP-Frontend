import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SaveModal from '../components/modal/SaveModal';
import diaryData from '../data/Diary.json';

const PageContainer = styled.div`
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 10vw;
`;

const DateContainer = styled.div`
  font-family: 'Pretendard';
  display: flex;
  width: 100%;
  align-items: baseline;
  margin-bottom: 12px;
`;

const DateLabel = styled.span`
  font-size: 17px;
  color: #838383;
`;

const DateText = styled.span`
  font-size: 17px;
  color: #333333;
  margin-left: 24px;
`;

const DiaryTitle = styled.div`
  width: 100%;
  padding: 8px;
  margin-left: -5px;
  margin-bottom: 12px;
  border: none;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 48px;
  color: #333333;
  outline: none;
  text-align: left;
  ::placeholder {
    color: #E1E1E0;
  }
`;

const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 12px;
`;

const EditButton = styled.button`
  width: 110px;
  height: 37px;
  font-family: "Pretendard";
  font-weight: 500;
  background-color: transparent; 
  color: #535353;
  border: 1px solid #ACACAC;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 10px;

  &:hover {
    background-color: #F7F7F7;
  }
`;


const ResultButton = styled.button`
  width: 110px;
  height: 37px;
  font-family: "Pretendard";
  font-weight: 500;
  background-color: transparent; 
  color: #535353;
  border: 1px solid #ACACAC;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;

  &:hover {
    background-color: #F7F7F7;
  }
`;

const ContentTextarea = styled.textarea`
  font-family: "Pretendard";
  outline: none; 
  width: 100%;
  height: 800px;
  padding: 8px;
  border: none;
  margin-top: -10px;
  line-height: 25px;
  font-size: 18px;
  color: #2D2D2D;
  margin-left: -10px;
`;


const DiaryImage = styled.img`
  width: 416px;
  height: 416px;
  margin-top: 15px;
  margin-bottom: 20px; // 이미지 아래 여백 추가
  align-self: flex-start; // 이미지를 왼쪽으로 정렬
`;

export default function WritePage() {
  const [date, setDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diary, setDiary] = useState(diaryData.DiaryList[0]); 

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    setDate(formattedDate);
  }, []);

  const handleSaveClick = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <PageContainer>
      <SaveButtonContainer>
        <EditButton>수정하기</EditButton>
        <ResultButton onClick={handleSaveClick}>분석결과</ResultButton>
      </SaveButtonContainer>
      <DateContainer>
        <DateLabel>Date</DateLabel>
        <DateText>{diary.createdAt}</DateText>
      </DateContainer>
      <DiaryTitle>{diary.title}</DiaryTitle>
      <hr style={{ width: '100%', color: '#CECECE' }} />
      <DiaryImage src={diary.image} alt="Diary" /> 
      <ContentTextarea
        as="div" // textarea 대신 div로 변경
        readOnly
        style={{ height: 'auto', whiteSpace: 'pre-wrap' }} // 내용이 div에 맞게 자동으로 줄바꿈되도록 스타일 수정
      >
        {diary.content}
      </ContentTextarea>
    </PageContainer>
  );
}
