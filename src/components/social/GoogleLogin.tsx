import React from "react";
import styled from "styled-components";
import googleLogo from "../../assets/images/google.png";

const GoogleContainer = styled.div`
  width: 30vw;
  height: 5vh;
  border: 0.1vw solid #686868;
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  padding: 0.5vw;
  margin: 0.7vh 0 0.7vh 0;
`;

const GoogleLogo = styled.img`
  width: 1.6vw;
  height: auto;
  margin-left: 1vw;
`;

const LoginText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.1rem;
`;

export default function Google() {
  return (
    <GoogleContainer>
      <GoogleLogo src={googleLogo} />
      <LoginText>Google로 로그인</LoginText>
    </GoogleContainer>
  );
}
