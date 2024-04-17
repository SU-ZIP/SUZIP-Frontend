import React from "react";
import styled from "styled-components";
import naverLogo from "../../assets/images/naver.png";

const NaverContainer = styled.div`
  width: 30vw;
  height: 5vh;
  border: 0.1vw solid #56bc3d;
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  padding: 0.5vw;
  background: #56bc3d;
  margin: 0.7vh 0 0.7vh 0;
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
`;

const NaverLogo = styled.img`
  width: 2vw;
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
  color: white;
`;

export default function Naver() {
  const handleLogin = () => {
    const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=REACT_APP_STATE`;
    window.location.href = naverAuthURL;
  };

  return (
    <NaverContainer onClick={handleLogin}>
      <NaverLogo src={naverLogo} />
      <LoginText>Naver로 로그인</LoginText>
    </NaverContainer>
  );
}
