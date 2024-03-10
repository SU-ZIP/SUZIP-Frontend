import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 5.5vw;
  border: 1px solid #acacac;
  border-radius: 0.3vw;
  padding: 0.7vh 0 0.7vh 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 0.8vw;
  color: #535353;
  white-space: nowrap;
  display: inline-block;
`;
function Logout_White() {
  return (
    <ButtonContainer>
      <TextContainer>로그아웃</TextContainer>
    </ButtonContainer>
  );
}

export default Logout_White;
