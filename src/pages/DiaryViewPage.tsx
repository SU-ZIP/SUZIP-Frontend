import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import SaveModal from '../components/modal/SaveModal';

const PageContainer = styled.div`
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 10vw;
  padding-bottom: 20vh;
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
`;

const DiaryImage = styled.img`
  margin-top: 15px;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const ContentTextarea = styled.div`
  font-family: "Pretendard";
  outline: none;
  width: 100%;
  height: auto;
  padding: 8px;
  margin-top: -10px;
  line-height: 25px;
  font-size: 18px;
  color: #2D2D2D;
  white-space: pre-wrap;
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

interface Diary {
  title: string;
  date: string;
  content: string;
  image: string;
}

export default function DiaryViewPage() {
  const { diaryId } = useParams<{ diaryId: string }>();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDiary() {
      const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기
      if (!token) {
        console.error("No access token available.");
        setError("Authentication failed. No access token found.");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8080/api/diary/${diaryId}`, {
          headers: {
            Authorization: `Bearer ${token}` // 헤더에 토큰 추가
          }
        });
  
        if (response.data.isSuccess) {
          setDiary(response.data.result);
          setError(null);
        } else {
          setError("Failed to load diary data.");
          console.error('API responded with an error:', response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch diary data:", error);
        setError("An error occurred while fetching diary data.");
      }
    }
  
    fetchDiary();
  }, [diaryId]);
  

  if (error) return <div>Error: {error}</div>;
  if (!diary) return <div>Loading...</div>;

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
        <DateText>{diary.date}</DateText>
      </DateContainer>
      <DiaryTitle>{diary.title}</DiaryTitle>
      <hr style={{ width: '100%', color: '#CECECE' }} />
      <DiaryImage src={diary.image} alt="Diary" />
      <ContentTextarea>
        {diary.content}
      </ContentTextarea>
    </PageContainer>
  );
}
