import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TitleTypo from "../components/about/TitleTypo";
import RecordDescription from "../components/about/RecordDescription";
import GetStarted_Black from "../assets/buttons/GetStarted_Black";
import GetStarted_White from "../assets/buttons/GetStarted_White";
import AnalyzeDescription from "../components/about/AnalyzeDescription";
import CalendarDescription from "../components/about/CalendarDescription";
import Slider2 from "../components/about/Slider2";
import EmotionBox from "../components/about/EmotionBox"

const AboutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 5vh;
`;

const TypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2vh 0 2vh 0;
`;

const BoldTypo = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 4rem;
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
  return (
    <AboutPageContainer>
      <GetStarted_Black />
      <TitleTypo />
      <VerticalLine />
      <RecordDescription />
      <AnalyzeDescription />
      <EmotionBox />
      <CalendarDescription />
      <Slider2 />
      <TypoContainer>
        <BoldTypo>It's time to</BoldTypo>
        <BoldTypo>SUZIP.</BoldTypo>
      </TypoContainer>
      <GetStarted_White />
      <SignUpText>
        이미 계정이 있다면?
        <SignUpLink to="/login">로그인하기</SignUpLink>
      </SignUpText>
    </AboutPageContainer>
  );
}
