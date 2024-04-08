import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const Box = styled.div<{ isClicked: boolean }>`
  font-family: 'PPMonumentExtended';
  width: ${({ isClicked }) => (isClicked ? '542px' : '299px')};
  height: ${({ isClicked }) => (isClicked ? '430px' : '563px')};
  color: #333333;
  background-color: #EDEDED;
  margin: 10px;
  overflow: hidden;
  position: relative;
  transition: all 0.5s ease;
  font-size: ${({ isClicked }) => (isClicked ? '24px' : '128px')};
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: ${({ isClicked }) => (isClicked ? 'flex-start' : 'center')};
  justify-content: ${({ isClicked }) => (isClicked ? 'flex-start' : 'center')};
  letter-spacing: -5px;
  z-index: ${({ isClicked }) => (isClicked ? 2 : 1)};
  padding: ${({ isClicked }) => (isClicked ? '20px' : '0')};
`;

const Title = styled.h2`
  font-family: 'PPMonumentExtended';
  font-weight: regular;
  position: absolute;
  top: 20px;
  left: 20px;
  margin: 0;
  font-size: 24px;
  color: black;
  display: none;
`;

const FullText = styled.span<{ isHovered: boolean; isClicked: boolean }>`
  white-space: nowrap;
  position: absolute;
  left: 20px; // 기본 위치 설정
  bottom: 12rem;
  display: ${({ isClicked }) => (isClicked ? 'none' : 'block')};
  animation: ${({ isHovered, isClicked }) => isHovered && !isClicked ? css`${slideIn} 2s forwards` : 'none'};
`;


interface EmotionBoxProps {
  text: string;
  isClicked: boolean;
  setIsClicked: (value: string) => void;
}

const EmotionBox: React.FC<EmotionBoxProps> = ({ text, isClicked, setIsClicked }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      isClicked={isClicked}
      onClick={() => setIsClicked(isClicked ? '' : text)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isClicked && <Title>{text}</Title>}
      <FullText isHovered={isHovered || isClicked} isClicked={isClicked}>{text}</FullText>
    </Box>
  );
};

const EmotionBoxesPage: React.FC = () => {
  const [clickedBox, setClickedBox] = useState<string>('');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
    {['Happiness', 'Angriness', 'Excited', 'Horror', 'Sadness'].map((emotion) => (
      <EmotionBox
        key={emotion}
        text={emotion}
        isClicked={clickedBox === emotion}
        setIsClicked={setClickedBox}
      />
    ))}
    {clickedBox && (
      // 여기서 Title 위치를 동적으로 조정해야 하지만, 예시로는 정적인 스타일을 제시함
      <Title style={{ display: 'block', position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', zIndex: '3' }}>
        {clickedBox}
      </Title>
    )}
  </div>
  );
};

export default EmotionBoxesPage;
