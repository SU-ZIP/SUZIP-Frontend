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

function Kakao() {
  return (
    <KakaoContainer>
      <KakaoLogo src={kakaoLogo} />
      <LoginText>Kakao로 시작하기</LoginText>
    </KakaoContainer>
  );
}

export default Kakao;
