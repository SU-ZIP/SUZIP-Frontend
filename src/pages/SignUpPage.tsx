import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Google from "../components/social/GoogleSignUp";
import Naver from "../components/social/NaverSignUp";
import Kakao from "../components/social/KakaoSignUp";
import App from "../App";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
`;

const TitleText = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 1.7rem;
  font-weight: light;
  display: block;
  margin-bottom: 0.5vh;
  width: fit-content;
`;

const ContentText = styled.div`
  display: block;
  margin-bottom: 2.7vh;
  width: fit-content;

  font-family: "Pretendard";
  font-weight: 300;
  font-size: 1.1rem;
  color: #616161;
`;

function SignUpPage() {
  return (
    <LoginContainer>
      <LoginBox>
        <TitleText>SIGN UP</TitleText>
        <ContentText>소셜로그인을 통해 빠르게 가입이 가능해요</ContentText>
        <ButtonsContainer>
          <Google />
          <Naver />
          <Kakao />
        </ButtonsContainer>
      </LoginBox>
    </LoginContainer>
  );
}

export default SignUpPage;
