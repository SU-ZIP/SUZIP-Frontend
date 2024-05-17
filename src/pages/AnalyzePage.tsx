import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GooSpinner } from 'react-spinners-kit';
import axios from 'axios';
import BubbleImg from '../assets/images/speechbubble.png';
import DescriptionImg from '../assets/images/question.png';
import ScrapImg from '../assets/images/scrap.png';
import ScrappedImg from '../assets/images/scrapped.png';
import { DiaryData } from '../types';
import config from '../assets/path/config';

interface AnalyzePageProps {
  diaryData: DiaryData;
}

const Container = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
`;

const Content = styled.div`
  margin-top: 2vh;
  width: 62vw;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  color: #333333;
  letter-spacing: -0.3px;
  font-size: 1.5rem;
  margin-bottom: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewDiaryButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  font-family: "Pretendard";
  color: #333333;
  background: transparent;
  border: 1px solid #333333;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Divider = styled.hr`
  border: none;
  width: 100%;
  height: 1px;
  background-color: #b7b7b7;
  margin-top: 1vh;
  margin-bottom: 2vh;
`;

const Date = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  color: #9F9F9F;
  font-size: 1rem;
  margin-bottom: 3vh;
`;

const EmotionBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7vh;
`;

const Emotion = styled.div`
  color: #4E4E4E;
  padding: 1.5vw;
  border: 1px solid #B7B7B7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 20%;
  height: 10vh;
`;

const EmotionTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  margin-bottom: 3vh;
  font-size: 1.25rem; 
  color: #4E4E4E;
`;

const EmotionText = styled.div`
  font-weight: 600;
  font-size: 2rem;
  color: #4E4E4E;
`;

const QuoteBox = styled.div`
  flex: 2;
  font-family: "Pretendard";
  color: #4E4E4E;
  padding: 1.5vw;
  border: 1px solid #B7B7B7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 20%;
  height: 10vh;
  margin-left: 1vw;
`;

const EmotionColorBox = styled.div`
  margin-bottom: 2vh;
  position: relative;
`;

const ColorBar = styled.div`
  height: 10vh;
  background: ${(props) => props.color || "#ccc"};
`;

const ColorTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
`;

const ColorTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 600;
  letter-spacing: -0.3px;
  font-size: 1.25rem; 
  color: #333333;
`;

const DescriptionIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  position: relative;

  &:hover + div {
    display: block;
  }
`;

const DescriptionBubble = styled.div`
  display: none;
  position: absolute;
  top: 2rem;
  left: 3.8rem;
  width: 180px;
  height: 105px;
  padding: 1rem;
  background: url(${BubbleImg}) no-repeat center center;
  background-size: cover;
  font-family: "Pretendard";
  font-size: 13px;
  color: #5A5A5A;
  text-align: center;
`;

const ServiceBox = styled.div`
  margin-bottom: 2vh;
  position: relative;
`;

const ServiceTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
  margin-top: 7vh;
`;

const ServiceTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 600;
  letter-spacing: -0.3px;
  font-size: 1.25rem; 
  color: #333333;
`;

const ServiceDescriptionIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  position: relative;

  &:hover + div {
    display: block;
  }
`;

const ServiceDescriptionBubble = styled.div`
  display: none;
  position: absolute;
  top: -6rem;
  left: 10rem;
  width: auto;
  padding: 1rem;
  background: url(${BubbleImg}) no-repeat center center;
  background-size: cover;
  font-family: "Pretendard";
  font-size: 13px;
  color: #5A5A5A;
  text-align: center;
`;

const Recommendations = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RecommendationCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5vh;
  margin-bottom: 1vh;
`;

const RecommendationCategory = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.125rem;
  text-align: left;
  letter-spacing: -0.3px;
  width: 32%;
`;

const Recommendation = styled.div`
  width: 32%;
  text-align: center;
  border: 1px solid #B7B7B7;
  height: 50vh;
  padding-bottom: 4vh;
  position: relative;
`;

const RecommendationImage = styled.img`
  margin-top: 4vh;
  width: 15vw;
  height: auto;
  margin-bottom: 1vh;
`;

const RecommendationText = styled.div`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: -0.3px;
  padding-left: 30px;
  padding-right: 30px;
  color: #333333;
`;

const RecommendationSubText = styled.div`
  font-family: "Pretendard";
  margin-top: 0.5vh;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.3px;
  color: #8E8E8E;
`;

const ScrapButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingText = styled.div`
  margin-top: 30px;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 20px;
  color: #333333;
`;

const emotionColorMap = {
  기쁨: "linear-gradient(45deg, #96fbc4 0%, #f9f586 100%)",
  분노: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  슬픔: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  불안: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  상처: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
};

const AnalyzePage: React.FC = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { diaryData } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [scrapStatus, setScrapStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (diaryData) {
      setLoading(false);
    } else {
      const fetchDiaryData = async () => {
        try {
          const response = await axios.get(`${config.API_URL}/api/diary`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
          if (response.data.isSuccess) {
            navigate(`/analyze/${diaryId}`, { state: { diaryData: response.data.result } });
          } else {
            console.error('Failed to fetch diary data:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching diary data:', error);
        }
      };

      fetchDiaryData();
    }
  }, [diaryData, diaryId, navigate]);

  const handleScrap = async (type: 'movie' | 'book' | 'music', contentId: number) => {
    try {
      const response = await axios.post(`${config.API_URL}/api/scrap`, { contentId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.data.isSuccess) {
        setScrapStatus((prev) => ({ ...prev, [contentId]: !prev[contentId] }));
      } else {
        console.error('Failed to scrap:', response.data.message);
      }
    } catch (error) {
      console.error('Error scrapping:', error);
    }
  };

  if (loading) {
    return (
      <LoadingOverlay>
        <GooSpinner size={50} color="#000" />
        <LoadingText>일기를 분석 중입니다</LoadingText>
      </LoadingOverlay>
    );
  }

  const { result } = diaryData;
  const { emotionResponseDto } = result;
  const emotionColor = emotionColorMap[emotionResponseDto.emotion.toUpperCase() as keyof typeof emotionColorMap] || "#ccc";

  return (
    <Container>
      <Content>
        <SectionTitle>
          {result.title}
          <ViewDiaryButton onClick={() => navigate(`/diary/${result.diaryId}`)}>일기 보기</ViewDiaryButton>
        </SectionTitle>
        <Divider />
        <Date>{result.date} 작성</Date>
        <EmotionBoxContainer>
          <Emotion>
            <EmotionTitle>오늘의 감정</EmotionTitle>
            <EmotionText>{emotionResponseDto.emotion}</EmotionText>
          </Emotion>
          <QuoteBox>
            <EmotionTitle>오늘의 문장</EmotionTitle>
            <EmotionText>{emotionResponseDto.sentence}</EmotionText>
          </QuoteBox>
        </EmotionBoxContainer>
        <EmotionColorBox>
          <ColorTitleContainer>
            <ColorTitle>감정의 색</ColorTitle>
            <DescriptionIcon src={DescriptionImg} alt="Description" />
            <DescriptionBubble>
              아래 표현된 색상은 당신의 일기에서 추출된 감정의 색입니다. 추상적인 감정이라는 개념을 다양한 색상을 통해 시각적이고 직관적으로 느껴보세요. 새로운 영감과 사유를 얻을 수 있습니다.
            </DescriptionBubble>
          </ColorTitleContainer>
          <Divider />
          <ColorBar color={emotionColor} />
        </EmotionColorBox>
        <ServiceBox>
          <ServiceTitleContainer>
            <ServiceTitle>추천 서비스</ServiceTitle>
            <ServiceDescriptionIcon src={DescriptionImg} alt="Description" />
            <ServiceDescriptionBubble>
              수집이 추천하는 맞춤 컨텐츠입니다. 오늘에 어울리는 컨텐츠를 통해 나의 감정을 깊이 있게 탐색하고 새로운 나를 발견할 수 있습니다. 수집과 함께 감각의 지평을 넓혀보세요.
            </ServiceDescriptionBubble>
          </ServiceTitleContainer>
          <Divider />
          <RecommendationCategoryContainer>
            <RecommendationCategory>영화 추천</RecommendationCategory>
            <RecommendationCategory>책 추천</RecommendationCategory>
            <RecommendationCategory>음악 추천</RecommendationCategory>
          </RecommendationCategoryContainer>
          <Recommendations>
            {emotionResponseDto.recommendations.movie && (
              <Recommendation>
                <ScrapButton
                  src={scrapStatus[emotionResponseDto.recommendations.movie.movieId] ? ScrappedImg : ScrapImg}
                  alt="Scrap"
                  onClick={() => handleScrap('movie', emotionResponseDto.recommendations.movie.movieId)}
                />
                <RecommendationImage src={emotionResponseDto.recommendations.movie.image} alt={emotionResponseDto.recommendations.movie.name} />
                <RecommendationText>{emotionResponseDto.recommendations.movie.name}</RecommendationText>
                <RecommendationSubText>{emotionResponseDto.recommendations.movie.director} | {emotionResponseDto.recommendations.movie.genre}</RecommendationSubText>
              </Recommendation>
            )}
            {emotionResponseDto.recommendations.book && (
              <Recommendation>
                <ScrapButton
                  src={scrapStatus[emotionResponseDto.recommendations.book.bookId] ? ScrappedImg : ScrapImg}
                  alt="Scrap"
                  onClick={() => handleScrap('book', emotionResponseDto.recommendations.book.bookId)}
                />
                <RecommendationImage src={emotionResponseDto.recommendations.book.image} alt={emotionResponseDto.recommendations.book.name} />
                <RecommendationText>{emotionResponseDto.recommendations.book.name}</RecommendationText>
                <RecommendationSubText>{emotionResponseDto.recommendations.book.author} | {emotionResponseDto.recommendations.book.genre}</RecommendationSubText>
              </Recommendation>
            )}
            {emotionResponseDto.recommendations.music && (
              <Recommendation>
                <ScrapButton
                  src={scrapStatus[emotionResponseDto.recommendations.music.musicId] ? ScrappedImg : ScrapImg}
                  alt="Scrap"
                  onClick={() => handleScrap('music', emotionResponseDto.recommendations.music.musicId)}
                />
                <RecommendationImage src={emotionResponseDto.recommendations.music.image} alt={emotionResponseDto.recommendations.music.name} />
                <RecommendationText>{emotionResponseDto.recommendations.music.name}</RecommendationText>
                <RecommendationSubText>{emotionResponseDto.recommendations.music.artist}</RecommendationSubText>
              </Recommendation>
            )}
          </Recommendations>
        </ServiceBox>
      </Content>
    </Container>
  );
};

export default AnalyzePage;
