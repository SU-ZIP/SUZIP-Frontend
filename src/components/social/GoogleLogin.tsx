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
  cursor: pointer;
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
  const handleLogin = () => {
    const GoogleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}`;
    window.location.href = GoogleAuthURL;
  };
  return (
    <GoogleContainer onClick={handleLogin}>
      <GoogleLogo src={googleLogo} />
      <LoginText>Google로 로그인</LoginText>
    </GoogleContainer>
  );
}
