import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
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
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  width: calc(100% - 4vw);
  margin: 0 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
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
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
`;

const AnimatedSection = styled.div<{ translateX: number }>`
  width: 100%;
  margin: 10vh 0;
  opacity: 1;
  transform: translateX(${(props) => props.translateX}px);
  transition: transform 0.2s ease-out;
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

const SignUpLink = styled(Link)<{ disabled: boolean }>`
  margin-left: 0.4vw;
  text-align: center;
  color: #333333;
  pointer: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const VerticalLine = styled.div`
  width: 0.1vw;
  height: 25vh;
  border-left: 0.1vw solid #535353;
  margin: 4vh 0;
`;

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function AboutPage() {
  const [leftTranslateX, setLeftTranslateX] = useState(250);
  const [rightTranslateX, setRightTranslateX] = useState(-250);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleScroll = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = scrollTop - lastScrollTop;

    if (leftVisible && leftTextRef.current) {
      const newLeftTranslateX = leftTranslateX + scrollDelta * 0.3;
      setLeftTranslateX(newLeftTranslateX);
    }

    if (rightVisible && rightTextRef.current) {
      const newRightTranslateX = rightTranslateX - scrollDelta * 0.3;
      setRightTranslateX(newRightTranslateX);
    }

    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  }, 10);

  useEffect(() => {
    const observerLeft = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLeftVisible(true);
          } else {
            setLeftVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observerRight = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRightVisible(true);
          } else {
            setRightVisible(false);
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (leftTextRef.current) {
        observerLeft.unobserve(leftTextRef.current);
      }
      if (rightTextRef.current) {
        observerRight.unobserve(rightTextRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    leftVisible,
    rightVisible,
    lastScrollTop,
    leftTranslateX,
    rightTranslateX,
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGetStartedClick = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      e.preventDefault();
    } else {
      navigate("/signup");
    }
  };

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
          <AnimatedSection ref={leftTextRef} translateX={leftTranslateX}>
            <LeftPopText />
          </AnimatedSection>
          <AnimatedSection ref={rightTextRef} translateX={rightTranslateX}>
            <RightPopText />
          </AnimatedSection>
        </PopTextContainer>
        <FooterImageBox />
        <TypoContainer>
          <BoldTypo>It's time to</BoldTypo>
          <BoldTypo>SUZIP.</BoldTypo>
        </TypoContainer>
        <div onClick={handleGetStartedClick}>
          <GetStarted_White />
        </div>
        <SignUpText>
          이미 계정이 있다면?
          <SignUpLink
            to="http://localhost:8080/api/login"
            disabled={isLoggedIn}
          >
            로그인하기
          </SignUpLink>
        </SignUpText>
      </ContentContainer>
    </AboutPageContainer>
  );
}
