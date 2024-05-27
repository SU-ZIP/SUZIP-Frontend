import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import frame from '../assets/images/frame.png';

// Styled components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
`;

const FrameContainer = styled.div`
  width: 80%;
  height: 80%;
  background-image: url(${frame});
  background-size: cover;
  background-position: center;
  border: 2px solid #ccc;
  position: relative;
  z-index: 1;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0; // Frame 뒤에 위치하도록 설정
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DateText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 18px;
  z-index: 2; // Frame 위에 위치하도록 설정
`;

const SuzipPage: React.FC = () => {
  const [diaryImage, setDiaryImage] = useState('');
  const [diaryDate, setDiaryDate] = useState('');

  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const response = await axios.get('/api/emotions/happy?page=1'); 
        const data = response.data.result.diaryList[0]; // 첫 번째 일기를 가져옴
        setDiaryImage(data.image);
        setDiaryDate(data.date);
      } catch (error) {
        console.error('Error fetching diary data', error);
      }
    };

    fetchDiaryData();
  }, []);

  return (
    <PageContainer>
      <ImageContainer>
        <Image src={diaryImage} alt="Diary Image" />
      </ImageContainer>
      <FrameContainer>
        <DateText>{diaryDate}</DateText>
      </FrameContainer>
    </PageContainer>
  );
};

export default SuzipPage;
