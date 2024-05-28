import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import TitleTypo from "../components/about/TitleTypo";
import RecordDescription from "../components/about/RecordDescription";
import GetStarted_Black from "../assets/buttons/GetStarted_Black";
import GetStarted_White from "../assets/buttons/GetStarted_White";
import AnalyzeDescription from "../components/about/AnalyzeDescription";
import CalendarDescription from "../components/about/CalendarDescription";
import Slider2 from "../components/about/Slider2";
import EmotionBox from "../components/about/EmotionBox";
import ServiceImageBox from "../components/about/ServiceImageBox";
import FooterImageBox from "../components/about/FooterImageBox";
import LeftPopText from "../components/about/LeftPopText";
import RightPopText from "../components/about/RightPopText";

const AboutPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7vh 0 10vh 0;
  overflow-x: hidden; /* 수평 스크롤바를 없애기 위해 추가 */
`;

const ContentContainer = styled.div`
  width: calc(
    100% - 4vw
  ); /* 전체 페이지의 너비를 뷰포트에서 4vw 뺀 크기로 설정 */
  margin: 0 2vw; /* 양 옆에 2vw의 margin을 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden; /* 수평 스크롤바를 없애기 위해 추가 */
`;

const TypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2vh 0 2vh 0;
`;

const PopTextContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(20%);
    opacity: 1;
  }
`;

const slideOutToLeft = keyframes`
  from {
    transform: translateX(20%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(-20%);
    opacity: 1;
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(-20%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const AnimatedSection = styled.div`
  width: 45%; /* 각 섹션의 너비 조정 */
  margin: 10vh 0;
  opacity: 0; /* 초기 상태 */
  transform: translateX(0); /* 초기 상태 */
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;

  &.slide-in-left {
    animation: ${slideInFromLeft} 1s ease forwards;
  }

  &.slide-out-left {
    animation: ${slideOutToLeft} 1s ease forwards;
  }

  &.slide-in-right {
    animation: ${slideInFromRight} 1s ease forwards;
  }

  &.slide-out-right {
    animation: ${slideOutToRight} 1s ease forwards;
  }
`;

const BoldTypo = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 4.1rem;
  font-weight: 200;
  color: #333333;
  line-height: 1.2;
`;

const SignUpText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: 1.1rem;
  color: #333333;
`;

const SignUpLink = styled(Link)`
  margin-left: 0.4vw;
  text-align: center;
  color: #333333;
`;

const VerticalLine = styled.div`
  width: 0.1vw;
  height: 25vh;
  border-left: 0.1vw solid #535353;
  margin: 4vh 0;
`;

export default function AboutPage() {
  const [leftTextAnimation, setLeftTextAnimation] = useState("");
  const [rightTextAnimation, setRightTextAnimation] = useState("");
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useEffect(() => {
    const observerLeft = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLeftTextAnimation("slide-in-left");
          } else {
            setLeftTextAnimation("slide-out-left");
          }
        });
      },
      { threshold: 0.1 }
    );

    const observerRight = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRightTextAnimation("slide-in-right");
          } else {
            setRightTextAnimation("slide-out-right");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (leftTextRef.current) {
      observerLeft.observe(leftTextRef.current);
    }

    if (rightTextRef.current) {
      observerRight.observe(rightTextRef.current);
    }

    return () => {
      if (leftTextRef.current) {
        observerLeft.unobserve(leftTextRef.current);
      }
      if (rightTextRef.current) {
        observerRight.unobserve(rightTextRef.current);
      }
    };
  }, []);

  return (
    <AboutPageContainer>
      <ContentContainer>
        <GetStarted_Black />
        <TitleTypo />
        <VerticalLine />
        <RecordDescription />
        <ServiceImageBox />
        <AnalyzeDescription />
        <EmotionBox />
        <CalendarDescription />
      </ContentContainer>
      <Slider2 />
      <ContentContainer>
        <PopTextContainer>
          <AnimatedSection ref={leftTextRef} className={leftTextAnimation}>
            <LeftPopText />
          </AnimatedSection>
          <AnimatedSection ref={rightTextRef} className={rightTextAnimation}>
            <RightPopText />
          </AnimatedSection>
        </PopTextContainer>
        <FooterImageBox />
        <TypoContainer>
          <BoldTypo>It's time to</BoldTypo>
          <BoldTypo>SUZIP.</BoldTypo>
        </TypoContainer>
        <GetStarted_White />
        <SignUpText>
          이미 계정이 있다면?
          <SignUpLink to="/login">로그인하기</SignUpLink>
        </SignUpText>
      </ContentContainer>
    </AboutPageContainer>
  );
}
