import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { DiaryData } from '../types'; // Import the types

interface AnalyzePageProps {
  diaryData: DiaryData;
}

const AnalyzePageContainer = styled.div`
  font-family: 'Pretendard', Arial, sans-serif;
  padding: 20px;
  background: #fff;
  color: #333;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const DateText = styled.p`
  color: #666;
  font-size: 16px;
`;

const EmotionBox = styled.div`
  margin: 20px 0;
`;

const EmotionLabel = styled.h2`
  font-size: 20px;
  color: #333;
`;

const EmotionDescription = styled.p`
  font-size: 16px;
  margin-top: 5px;
`;

const ColorBar = styled.div`
  height: 25px;
  background: ${(props) => props.color || "#ccc"};
  border-radius: 5px;
  margin-top: 10px;
`;

const RecommendationsSection = styled.div`
  margin-top: 20px;
`;

const RecommendationItem = styled.div`
  margin-bottom: 20px;
`;

const RecommendationTitle = styled.h3`
  font-size: 18px;
`;

const RecommendationContent = styled.p`
  font-size: 14px;
  color: #666;
`;

const RecommendationImage = styled.img`
  width: 100px;
  height: auto;
  margin-top: 5px;
`;

const emotionColorMap = {
  HAPPY: "linear-gradient(0deg, #96fbc4 0%, #f9f586 100%)",
  ANGER: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  SADNESS: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  ANXIETY: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  HURT: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
};
const AnalyzePage: React.FC = () => {
    const location = useLocation();
    const { diaryData } = location.state || {};  // 기본값 사용
  
    if (!diaryData) {
      return <div>데이터를 불러오는 중입니다...</div>;
    }
  
    const { result } = diaryData;
    const { emotionResponseDto } = result;
    const emotionColor = emotionColorMap[emotionResponseDto.emotion.toUpperCase() as keyof typeof emotionColorMap] || "#ccc";
  
    return (
      <AnalyzePageContainer>
        <Title>{result.title}</Title>
        <DateText>{result.date} 작성</DateText>
        <EmotionBox>
          <EmotionLabel>오늘의 감정</EmotionLabel>
          <EmotionDescription>{emotionResponseDto.emotion}</EmotionDescription>
          <ColorBar color={emotionColor} />
        </EmotionBox>
        <RecommendationsSection>
          {emotionResponseDto.recommendations.book && (
            <RecommendationItem>
              <RecommendationTitle>책</RecommendationTitle>
              <RecommendationContent>{emotionResponseDto.recommendations.book.name} by {emotionResponseDto.recommendations.book.author}</RecommendationContent>
              <RecommendationImage src={emotionResponseDto.recommendations.book.image} alt={emotionResponseDto.recommendations.book.name} />
            </RecommendationItem>
          )}
          {emotionResponseDto.recommendations.movie && (
            <RecommendationItem>
              <RecommendationTitle>영화</RecommendationTitle>
              <RecommendationContent>{emotionResponseDto.recommendations.movie.name} by {emotionResponseDto.recommendations.movie.director}</RecommendationContent>
              <RecommendationImage src={emotionResponseDto.recommendations.movie.image} alt={emotionResponseDto.recommendations.movie.name} />
            </RecommendationItem>
          )}
          {emotionResponseDto.recommendations.music && (
            <RecommendationItem>
              <RecommendationTitle>음악</RecommendationTitle>
              <RecommendationContent>{emotionResponseDto.recommendations.music.name} by {emotionResponseDto.recommendations.music.artist}</RecommendationContent>
              <RecommendationImage src={emotionResponseDto.recommendations.music.image} alt={emotionResponseDto.recommendations.music.name} />
            </RecommendationItem>
          )}
        </RecommendationsSection>
      </AnalyzePageContainer>
    );
  }
  
  export default AnalyzePage;