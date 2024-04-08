import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Google from "../components/social/GoogleLogin";
import Naver from "../components/social/NaverLogin";
import Kakao from "../components/social/KakaoLogin";
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
  font-weight: 100;
  display: block;
  margin-bottom: 2.5vh;
  width: fit-content;
`;

const SignUpText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;

  font-family: "Pretendard";
  font-weight: 300;
  font-size: 1.1rem;
  color: #616161;
`;

const SignUpLink = styled(Link)`
  margin-left: 0.4vw;
  text-align: center;
  color: #616161;
`;

function SignInPage() {
  return (
    <LoginContainer>
      <LoginBox>
        <TitleText>LOGIN</TitleText>
        <ButtonsContainer>
          <Google />
          <Naver />
          <Kakao />
          <SignUpText>
            수집이 처음이신가요?
            <SignUpLink to="/signup">가입하기</SignUpLink>
          </SignUpText>
        </ButtonsContainer>
      </LoginBox>
    </LoginContainer>
  );
}

export default SignInPage;
