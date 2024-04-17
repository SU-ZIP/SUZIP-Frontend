import React from "react";
import styled from "styled-components";
import kakaoLogo from "../../assets/images/kakao.png";

const KakaoContainer = styled.div`
  width: 30vw;
  height: 5vh;
  border: 0.1vw solid #fceb4f;
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  padding: 0.5vw;
  background: #fceb4f;
  margin: 0.7vh 0 0.7vh 0;
  cursor: pointer; /* 추가: 마우스 오버시 커서 변경 */
`;

const KakaoLogo = styled.img`
  width: 1.7vw;
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

export default function Kakao() {
  const handleLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthURL;
  };

  return (
    <KakaoContainer onClick={handleLogin}>
      <KakaoLogo src={kakaoLogo} />
      <LoginText>Kakao로 로그인</LoginText>
    </KakaoContainer>
  );
}
