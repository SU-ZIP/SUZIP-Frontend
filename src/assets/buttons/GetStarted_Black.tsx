import React from "react";
import styled from "styled-components";
import rightArrow from "../images/rightArrow.png";

const ButtonContainer = styled.div`
  width: 10vw;
  background: black;
  border-radius: 5vw;
  padding: 0.7vh 0 0.7vh 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  font-family: "Pretendard";
  font-weight: 200;
  font-size: 0.8vw;
  color: white;
  white-space: nowrap;
  display: inline-block;
  margin-right: 0.5vw;
`;

const ImageContainer = styled.img`
  width: 1vw;
  display: inline-block;
`;

function GetStarted_Black() {
  return (
    <ButtonContainer>
      <TextContainer>GET STARTED</TextContainer>
      <ImageContainer src={rightArrow}></ImageContainer>
    </ButtonContainer>
  );
}

export default GetStarted_Black;
