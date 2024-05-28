import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import Happy from "../../assets/images/Happiness.png";
import Sad from "../../assets/images/Sadness.png";
import Hurt from "../../assets/images/Hurt.png";
import Anger from "../../assets/images/Angriness.png";
import Nervous from "../../assets/images/Nervous.png";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Box = styled.div<{ isClicked: boolean; isOtherClicked: boolean }>`
  font-family: "PPMonumentExtended";
  width: ${({ isClicked, isOtherClicked }) =>
    isClicked ? "40%" : isOtherClicked ? "15%" : "20%"};
  height: ${({ isClicked }) => (isClicked ? "50vh" : "80vh")};
  color: #333333;
  background-color: #ededed;
  margin: 10px;
  overflow: hidden;
  position: relative;
  transition: all 0.5s ease;
  font-size: ${({ isClicked }) => (isClicked ? "24px" : "128px")};
  cursor: pointer;
  border-radius: 0.8vw;
  display: flex;
  flex-direction: column;
  align-items: ${({ isClicked }) => (isClicked ? "flex-start" : "center")};
  justify-content: ${({ isClicked }) => (isClicked ? "flex-start" : "center")};
  letter-spacing: -5px;
  z-index: ${({ isClicked }) => (isClicked ? 2 : 1)};
  padding: ${({ isClicked }) => (isClicked ? "2vw" : "0")};
`;

const Title = styled.h2`
  font-family: "PPMonumentExtended";
  font-weight: 200;
  letter-spacing: -1px;
  font-weight: regular;
  position: fixed;
  margin: 0;
  font-size: 3.2vw;
  color: #333333;
  text-align: center;
`;

const FullText = styled.span<{ isHovered: boolean; isClicked: boolean }>`
  font-weight: 200;
  white-space: nowrap;
  position: absolute;
  left: 20px;
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
  width: 100%;
  max-height: auto;
  object-fit: cover;
  margin-bottom: 5vh;
  border-radius: 1.5vw;
`;

const Description = styled.div`
  font-family: "Pretendard";
  font-size: 1.3rem;
  font-weight: 300;
  color: #333;
  text-align: left;
  letter-spacing: 0.03em;
`;

interface EmotionBoxProps {
  text: string;
  isClicked: boolean;
  isOtherClicked: boolean;
  setIsClicked: (value: string) => void;
  onBoxClick: (element: HTMLDivElement | null) => void;
}

interface EmotionInfo {
  image: string;
  description: string;
}

interface EmotionDetails {
  [key: string]: EmotionInfo;
}

const emotionDetails: EmotionDetails = {
  Happiness: {
    image: Happy,
    description: `수집에서 행복은 초록 계열의 색으로 표현돼요<br /><br />행복은 일상의 작은 순간들, 사랑하는 사람과의 시간, 목표 달성의 기쁨, 자연 속의 평화로움을 의미합니다. 초록색은 평온함과 생동감을 상징합니다. 크고 작은 행복들을 기록해보세요.`,
  },
  Sadness: {
    image: Sad,
    description: `수집에서 슬픔은 파랑 계열의 색으로 표현돼요<br /><br />우리는 삶에서 슬픔을 피할 수 없지만, 위로와 공감을 통해 극복하고 다시 일어설 수 있습니다. 파란색은 깊이와 고요함을 상징합니다.`,
  },
  Angriness: {
    image: Anger,
    description: `수집에서 분노는 빨강 계열의 색으로 표현돼요<br /><br />분노는 우리 삶에서 강력하고 때로는 불가피한 감정으로, 긍정적인 원동력이 되기도 하고, 거친 폭력성으로 표출되기도 합니다. 빨간색은 강렬함과 에너지를 상징합니다.`,
  },
  Hurt: {
    image: Hurt,
    description: `수집에서 상처는 보라 계열의 색으로 표현돼요<br /><br />상처는 아픔과 고통을 동반하는 감정입니다. 우리는 살면서 크고 작은 마음의 상처를 입지만, 어떤 방식으로 치료할지는 각자에게 달려있어요. 내면의 상처를 알아차리고 들여다보는 시간을 가져보세요.`,
  },
  Nervous: {
    image: Nervous,
    description: `수집에서 불안은 노랑 계열의 색으로 표현돼요<br /><br />불안은 우리 삶에서 예측할 수 없는 상황과 미래에 대한 두려움에서 비롯되는 감정입니다. 노란색은 긴장과 경계를 상징하며, 불안한 감정을 생생하게 나타냅니다.`,
  },
};

const EmotionBox: React.FC<EmotionBoxProps> = ({
  text,
  isClicked,
  isOtherClicked,
  setIsClicked,
  onBoxClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const details = emotionDetails[text as keyof EmotionDetails];
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isClicked && boxRef.current) {
      onBoxClick(boxRef.current);
    }
  }, [isClicked, onBoxClick]);

  return (
    <Box
      ref={boxRef}
      isClicked={isClicked}
      isOtherClicked={isOtherClicked}
      onClick={() => setIsClicked(isClicked ? "" : text)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isClicked && (
        <>
          <EmotionImage src={details.image} alt={text} />
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
  const [titlePosition, setTitlePosition] = useState<{
    left: number;
    top: number;
  }>({
    left: 0,
    top: 0,
  });

  const handleBoxClick = (element: HTMLDivElement | null) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      setTitlePosition({ left: rect.left, top: rect.top });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const clickedElement = document.querySelector(".clicked");
      if (clickedElement) {
        const rect = clickedElement.getBoundingClientRect();
        setTitlePosition({ left: rect.left, top: rect.top });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "relative",
      }}
    >
      {["Happiness", "Angriness", "Nervous", "Hurt", "Sadness"].map(
        (emotion) => (
          <EmotionBox
            key={emotion}
            text={emotion}
            isClicked={clickedBox === emotion}
            isOtherClicked={clickedBox !== "" && clickedBox !== emotion}
            setIsClicked={(value) => {
              setClickedBox(value);
              handleBoxClick(document.querySelector(`.${emotion}`));
            }}
            onBoxClick={handleBoxClick}
          />
        )
      )}
      {clickedBox && (
        <Title
          style={{
            top: `${titlePosition.top}px`,
            left: `${titlePosition.left}px`,
            transform: "translateY(-100%)",
          }}
        >
          {clickedBox}
        </Title>
      )}
    </div>
  );
};

export default EmotionBoxesPage;
