import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import rightArrow from "../images/rightArrow2.png";
import config from "../path/config";

const ButtonContainer = styled(Link)`
  width: 10vw;
  border: 1px solid #333333;
  border-radius: 5vw;
  padding: 0.7vh 0 0.7vh 0;
  margin: 1vw;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 0.8vw;
  color: black;
  white-space: nowrap;
  display: inline-block;
  margin-right: 0.5vw;
`;

const ImageContainer = styled.img`
  width: 0.7vw;
  display: inline-block;
`;

function GetStarted_White() {
  return (
    <ButtonContainer to={`${config.API_URL}/api/signup`}>
      <TextContainer>GET STARTED</TextContainer>
      <ImageContainer src={rightArrow}></ImageContainer>
    </ButtonContainer>
  );
}

export default GetStarted_White;
