import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

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
  font-family: "PPMonumentExtended";
  width: ${({ isClicked }) => (isClicked ? "542px" : "299px")};
  height: ${({ isClicked }) => (isClicked ? "430px" : "563px")};
  color: #333333;
  background-color: #ededed;
  margin: 10px;
  overflow: hidden;
  position: relative;
  transition: all 0.5s ease;
  font-size: ${({ isClicked }) => (isClicked ? "24px" : "128px")};
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: ${({ isClicked }) => (isClicked ? "flex-start" : "center")};
  justify-content: ${({ isClicked }) => (isClicked ? "flex-start" : "center")};
  letter-spacing: -5px;
  z-index: ${({ isClicked }) => (isClicked ? 2 : 1)};
  padding: ${({ isClicked }) => (isClicked ? "20px" : "0")};
`;

const Title = styled.h2`
  font-family: "PPMonumentExtended";
  font-weight: 200;
  letter-spacing: -1px;
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
  font-weight: 200;
  white-space: nowrap;
  position: absolute;
  left: 20px; // 기본 위치 설정
  bottom: 12rem;
  display: ${({ isClicked }) => (isClicked ? "none" : "block")};
  animation: ${({ isHovered, isClicked }) =>
    isHovered && !isClicked
      ? css`
          ${slideIn} 2s forwards
        `
      : "none"};
`;

const EmotionImage = styled.img`
  width: 100%; // 혹은 필요한 사이즈로 조절
  max-height: 200px; // 이미지의 최대 높이 지정
  object-fit: cover; // 이미지가 박스를 꽉 채우도록 조정
`;

const Description = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 14px; // 설명글의 글씨 크기 조정
  color: #333; // 글씨 색상
  margin-top: 20px; // 이미지와의 여백 조정
`;

interface EmotionBoxProps {
  text: string;
  isClicked: boolean;
  setIsClicked: (value: string) => void;
}

interface EmotionInfo {
  image: string;
  description: string;
}

// 가능한 모든 감정들의 타입 정의
interface EmotionDetails {
  [key: string]: EmotionInfo;
}

const emotionDetails: EmotionDetails = {
  Happiness: {
    image: "../../assets/images/Happiness.png",
    description: `수집에서 행복은 초록 계열의 색으로 표현돼요<br />행복이란 뭐시기 뭐시기 이런 설명을 해줘요<br />여러분의 따뜻한 기억들을 이렇게 저렇게 저러쿵 이러쿵 해요<br />안녕하세요 안녕하십니까 냠냠냠 이렇게 해봐요 요렇게`,
  },
  // 다른 감정들에 대한 정보도 이와 같은 형식으로 추가...
};

const EmotionBox: React.FC<EmotionBoxProps> = ({
  text,
  isClicked,
  setIsClicked,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const details = emotionDetails[text as keyof EmotionDetails];

  return (
    <Box
      isClicked={isClicked}
      onClick={() => setIsClicked(isClicked ? "" : text)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isClicked && (
        <>
          <EmotionImage src={`../assets/images/${details.image}`} alt={text} />
          <Description
            dangerouslySetInnerHTML={{ __html: details.description }}
          />
        </>
      )}
      {!isClicked && (
        <FullText isHovered={isHovered || isClicked} isClicked={isClicked}>
          {text}
        </FullText>
      )}
    </Box>
  );
};

const EmotionBoxesPage: React.FC = () => {
  const [clickedBox, setClickedBox] = useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {["Happiness", "Angriness", "Excited", "Horror", "Sadness"].map(
        (emotion) => (
          <EmotionBox
            key={emotion}
            text={emotion}
            isClicked={clickedBox === emotion}
            setIsClicked={setClickedBox}
          />
        )
      )}
      {clickedBox && (
        // 여기서 Title 위치를 동적으로 조정해야 하지만, 예시로는 정적인 스타일을 제시함
        <Title
          style={{
            display: "block",
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "3",
          }}
        >
          {clickedBox}
        </Title>
      )}
    </div>
  );
};

export default EmotionBoxesPage;
