import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333333;
`;

const LineText = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 6.5rem;
  font-weight: 200;
  position: relative;
  padding: 0 100px; // 양쪽 선을 위한 공간 확보

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-left: 2px solid #333;
    height: 80%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const ThinText = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 5rem;
  font-weight: 100;
`;

const AnimatedTextContainer = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 6.3rem;
  font-weight: 200;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimatedText = styled.span`
  position: absolute;
`;

const FixedBrackets = styled.span`
  font-family: "PPMonumentExtended";
  font-size: 6.3rem;
  font-weight: 200;
`;

const words = ["minds", "memories", "emotions"];
const randomChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!@#$%^&*()-+=<>";

const TitleTypo: React.FC = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isTransitioning) {
      intervalId = setInterval(() => {
        const randomWord = Array.from({ length: words[wordIndex].length })
          .map(() =>
            randomChars.charAt(Math.floor(Math.random() * randomChars.length))
          )
          .join("");
        setCurrentWord(randomWord);
      }, 50);

      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setCurrentWord(words[wordIndex]);
        setIsTransitioning(false);
      }, 2000); // Display random characters for 2 seconds before showing the actual word

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    } else {
      const timeoutId = setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsTransitioning(true);
      }, 2000); // Pause for 2 seconds on the actual word before moving to the next word

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [wordIndex, isTransitioning]);

  return (
    <TypoContainer>
      <LineText>Su.Zip</LineText>
      <ThinText>your</ThinText>
      <AnimatedTextContainer>
        <FixedBrackets>(ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</FixedBrackets>
        <AnimatedText>{currentWord}</AnimatedText>
        <FixedBrackets>)</FixedBrackets>
      </AnimatedTextContainer>
    </TypoContainer>
  );
};

export default TitleTypo;
