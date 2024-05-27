import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import frame2 from '../assets/images/frame2.png';
import config from '../assets/path/config';

const PageContainer = styled.div`
  height: 200vh; /* 스크롤을 위해 페이지 높이를 크게 설정 */
  background-color: #f0f0f0;
  position: relative;
`;

const Frame1Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  z-index: 2;
`;

const TitleContainer = styled.div`
  position: fixed;
  top: 70px; /* Frame1 아래에 위치 */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  text-align: center;
  color: black;
  z-index: 2;
`;

const MainTitle = styled.h1`
  font-family: "PPMonumentExtended";
  font-size: 4em;
  font-weight: bold;
  text-align: left;
  margin-left: 8vw;
`;

const SubTitle = styled.div`
  display: flex;
  font-family: "PPMonumentExtended";
  justify-content: flex-end;
  align-items: center;
  margin-right: 3vw;
  text-align: right;
`;

const BoldText = styled.span`
  font-weight: 300;
`;

const LightText = styled.span`
  font-weight: 200;
`;

const Frame2Container = styled.div<{ translateY: number }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-image: url(${frame2});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transform: translateY(${(props) => props.translateY}px);
  transition: transform 0.3s;
`;

const ContentContainer = styled.div`
  position: fixed;
  top: 150vh; /* Frame1과 Frame2 사이에 위치 */
  width: 80%;
  margin: 0 auto;
  background-color: white;
  padding: 200px;
  z-index: 1;
  transform: translateY(-50%);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2em;
  margin-top: 20px;
`;

const DateText = styled.p`
  text-align: right;
  font-size: 1em;
  margin-top: 10px;
`;

const NoImageText = styled.div`
  font-size: 24px;
  color: #bbb;
  text-align: center;
`;

const SuzipPage: React.FC = () => {
  const [diaryImage, setDiaryImage] = useState('');
  const [diaryDate, setDiaryDate] = useState('');
  const [diaryTitle, setDiaryTitle] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('No access token found');
        }
        const response = await axios.get(`${config.API_URL}/api/emotions/happy`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const diary = response.data.result; // 단일 일기 객체로 접근
        if (diary) {
          setDiaryImage(diary.image || '');
          setDiaryDate(diary.date);
          setDiaryTitle(diary.title);
        } else {
          setDiaryImage('');
          setDiaryDate('No diary available');
          setDiaryTitle('No title available');
        }
      } catch (error) {
        console.error('Error fetching diary data', error);
        setDiaryImage('');
        setDiaryDate('Error fetching data');
        setDiaryTitle('Error fetching data');
      }
    };

    fetchDiaryData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageContainer>
      <Frame1Container />
      <TitleContainer>
        <MainTitle>Happy</MainTitle>
        <SubTitle>
          <BoldText>Collection</BoldText>
          <LightText>&nbsp;of&nbsp;</LightText>
          <BoldText>Happiness</BoldText>
        </SubTitle>
      </TitleContainer>
      <Frame2Container translateY={scrollY / 2} />
      <ContentContainer>
        {diaryImage ? (
          <Image src={diaryImage} alt="Diary Image" />
        ) : (
          <NoImageText>No Image</NoImageText>
        )}
        <Title>{diaryTitle}</Title>
        <DateText>{diaryDate}</DateText>
      </ContentContainer>
    </PageContainer>
  );
};

export default SuzipPage;
