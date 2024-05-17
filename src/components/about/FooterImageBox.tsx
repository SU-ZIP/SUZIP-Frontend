import React from "react";
import styled from "styled-components";
import imageLogo from "../../assets/images/imageLogo.png";

const BoxContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 10vw;
`;

const BackImage = styled.div`
  width: 70vw;
  height: 50vh;
  background: blue;
  border-radius: 1vw 1vw 0 0;
  z-index: 1;
  box-shadow: 0.1vw 1.5vw 2vw 0.1vw lightgray;
`;

const LogoImage = styled.img`
  width: 5vw;
  height: auto;
  position: absolute;
  bottom: -2.5vw; /* 백 이미지의 아래 중앙으로 위치시키기 위한 설정 */
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1vw;
  z-index: 2;
  background: black; /* 이미지 주변의 배경색을 추가 */
  padding: 0.5vw; /* 배경색과 이미지 사이의 간격 추가 */
`;

function FooterImageBox() {
  return (
    <BoxContainer>
      <BackImage />
      <LogoImage src={imageLogo} />
    </BoxContainer>
  );
}

export default FooterImageBox;
